
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import Sidebar from '../Sidebar/page'

export default function PolicyPage() {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-[96px]">
      <Sidebar/>
      
      <main className="flex-1 p-4">
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-4 shadow-sm">
            <AccordionItem value="general-terms" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                general terms
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                Add your general terms content here.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                Privacy policy
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                Add your privacy policy content here.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                refund policy
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                Add your refund policy content here.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="border rounded-lg bg-white shadow-md">
              <AccordionTrigger className="text-left px-4 py-4 w-full">
                payment policy
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                Add your payment policy content here.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  )
}

