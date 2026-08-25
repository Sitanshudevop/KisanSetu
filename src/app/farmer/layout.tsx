import { GrievanceChatbot } from "@/components/GrievanceChatbot";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GrievanceChatbot />
    </>
  );
}
