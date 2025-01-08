import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";

export default function ImageComparisonBasic() {
  return (
    <ImageComparison className="aspect-[16/10] w-full rounded-lg border border-zinc-200 dark:border-zinc-800">
      <ImageComparisonImage
        src="/images/image-comparison-dark.png"
        alt="Image Comparison Dark"
        position="left"
      />
      <ImageComparisonImage
        src="/images/image-comparison-light.png"
        alt="Image Comparison Light"
        position="right"
      />
      <ImageComparisonSlider className="bg-white" />
    </ImageComparison>
  );
}
