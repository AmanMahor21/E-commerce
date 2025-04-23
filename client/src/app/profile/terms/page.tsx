import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import Sidebar from '../Sidebar/page';

export default function PolicyPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 mt-[96px]">
      <Sidebar />

      <main className="lg:ml-72 lg:w-2/3  h-screen w-full p-4">
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-4 shadow-sm">
            <AccordionItem value="general-terms" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                general terms
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">Ageneral terms content.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                Privacy policy
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">Privacy policy content.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                refund policy
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">Refund policy content.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                payment policy
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">Payment policy content.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
}
