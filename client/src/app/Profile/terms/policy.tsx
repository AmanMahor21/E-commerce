import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../components/ui/accordion"
  
  export default function PolicyAccordion() {
    return (
      <div className="w-full p-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="general-terms" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="text-left px-4 py-3 w-full">
              general terms
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              Add your general terms content here.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="privacy" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="text-left px-4 py-3 w-full">
              Privacy policy
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              Add your privacy policy content here.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="refund" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="text-left px-4 py-3 w-full">
              refund policy
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              Add your refund policy content here.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="payment" className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="text-left px-4 py-3 w-full">
              patment policy
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              Add your payment policy content here.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  
  