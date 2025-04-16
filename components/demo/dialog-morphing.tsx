import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "@/registry/default/components/dialog-morphing";

const image = "https://placehold.co/400x300/FFFFFF/000";

export default function MorphingDialogBasic() {
  return (
    <>
      <MorphingDialog
        transition={{
          type: "spring",
          bounce: 0.05,
          duration: 0.25,
        }}
      >
        <MorphingDialogTrigger
          style={{
            borderRadius: "12px",
          }}
          className="bg-card text-card-foreground flex max-w-[270px] flex-col overflow-hidden border"
        >
          <MorphingDialogImage
            src={image}
            alt="Test."
            className="h-48 w-full object-cover"
          />
          <div className="flex flex-grow flex-row items-end justify-between p-2">
            <MorphingDialogTitle className="text-foreground">
              Title
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-muted-foreground">
              Subtitle
            </MorphingDialogSubtitle>
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent
            style={{
              borderRadius: "24px",
            }}
            className="bg-card text-card-foreground pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border sm:w-[500px]"
          >
            <MorphingDialogImage
              src={image}
              alt="Test."
              className="h-full w-full"
            />
            <div className="p-6">
              <MorphingDialogTitle className="text-foreground text-2xl">
                Title
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className="text-muted-foreground">
                Subtitle
              </MorphingDialogSubtitle>
              <MorphingDialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
              >
                <p className="text-muted-foreground mt-2 mb-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium, numquam dolorem eos reiciendis dolorum repudiandae
                  obcaecati atque blanditiis velit voluptatum vel itaque rem
                  labore dignissimos incidunt eum nostrum porro in!.
                </p>
                <a
                  className="text-foreground font-medium underline underline-offset-4"
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </MorphingDialogDescription>
            </div>
            <MorphingDialogClose className="text-primary-foreground" />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </>
  );
}
