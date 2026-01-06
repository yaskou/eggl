import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useWatchQuestion } from "~/hooks/watchQuestion";

type Props = {
  id: number;
  isQuestion: boolean;
  title: string;
  children: React.ReactNode;
};

export function CardWithScreentime({ id, isQuestion, title, children }: Props) {
  const { ref } = useWatchQuestion(id, isQuestion);

  return (
    <Card className="w-full" ref={ref}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
