import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch } from 'react-redux';
import { setProductFilter } from '@/reduxStore/productCategorizeSlice';
import { useLazyGetFilterProductsQuery } from '@/services/api';
import { useSelector } from 'react-redux';
import { resetProductInput, setFethedProducts } from '@/reduxStore/internalSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SpeechToText = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [isSupported, setIsSupported] = useState(true);
  const dispatch = useDispatch();
  const [fetchProducts, { data }] = useLazyGetFilterProductsQuery();
  const filters = useSelector((state: any) => state.product);
  const [productName, setProductName] = useState<string>('');
  const internalState = useSelector((state: any) => state.internal);
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();
  //
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setIsSupported(false);
    }
  }, [browserSupportsSpeechRecognition]);

  // Updating product input field by transcript or query search
  const query = searchParams.get('query');
  useEffect(() => {
    setProductName(transcript || query || '');
  }, [transcript]);
  // useEffect(() => {
  //   setProductName(transcript || query || '');
  // }, [transcript, searchParams]);

  const handleSpeech = async () => {
    // Turning off Mic, saving transcript in state, disabling active category and redirecting
    if (listening) {
      stopListening();
      if (transcript.trim() !== '') {
        dispatch(setProductFilter({ ...filters, keyword: transcript }));
        if (internalState?.isCategoryActive) dispatch(resetProductInput(false));

        if (pathname !== '/search') router.push(`/search?query=${encodeURIComponent(productName)}`);
      }
    } else {
      // turning on Mic
      startListening();
      resetTranscript();
    }
  };
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
    isSupported,
    handleSpeech,
    setProductName,
    productName,
  };
};

export default SpeechToText;
