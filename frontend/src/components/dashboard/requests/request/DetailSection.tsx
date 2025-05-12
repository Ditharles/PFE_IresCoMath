import { ReactNode } from "react";
import { Separator } from "../../../ui/separator";


interface DetailSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const DetailSection = ({ icon, title, children }: DetailSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </div>
    <Separator />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);
