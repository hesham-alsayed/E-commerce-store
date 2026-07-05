import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ProductAccordion() {
  return (
    <Accordion type="single" collapsible className="mt-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          Delivery 3-5 days
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          14 days return policy
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}