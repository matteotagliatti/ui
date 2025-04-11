import { SelectOption } from "@/registry/default/components/select-fancy";
import { NextRequest, NextResponse } from "next/server";

// This is a mock database of options. In a real application,
// you would likely fetch this from a database or external API
const mockOptions: SelectOption[] = [
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
  { value: "6", label: "Option 6" },
  { value: "7", label: "Option 7" },
  { value: "8", label: "Option 8" },
  { value: "9", label: "Option 9" },
  { value: "10", label: "Option 10" },
  // Add more options as needed
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter options based on the search query
  const filteredOptions = mockOptions.filter((option) =>
    option.label.toLowerCase().includes(query)
  );

  return NextResponse.json(filteredOptions);
}
