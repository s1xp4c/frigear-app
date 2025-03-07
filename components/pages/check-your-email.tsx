import { Card, CardContent, CardTitle } from '@/components/ui/card';

export const CheckYourEmail = () => {
  return (
    <div className="mx-auto mt-[10%]">
      <Card>
        <CardTitle>
          You&aposve got mail!
        </CardTitle>
        <CardContent>
          Check your email, you should have received a magic link to sign you in.
        </CardContent>
      </Card>
    </div>
  );
};
