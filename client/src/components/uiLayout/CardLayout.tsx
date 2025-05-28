import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardLayoutProps = {
  title: string;
  description?: string;
  Content: React.FC;
  Footer: React.FC;
};

const CardLayout = ({
  title,
  description,
  Content,
  Footer,
}: CardLayoutProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Content />
      </CardContent>
      <CardFooter>
        <Footer />
      </CardFooter>
    </Card>
  );
};

export default CardLayout;
