import { PageContainer } from "@/components/demo/page-container";
import { Link } from "@/components/progress-bar/progress-bar";

export default async function SlowPagePage() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Artificial delay of 2s
  return (
    <PageContainer>
      <Link href="/progress-bar" className="underline mb-12">
        Go to Progress Bar page
      </Link>
    </PageContainer>
  );
}
