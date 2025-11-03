import {
  Pill,
  PillAvatar,
  PillAvatarGroup,
  PillButton,
  PillDelta,
  PillIndicator,
  PillStatus,
} from "@/registry/default/components/pill";
import { CheckCircleIcon, XIcon } from "lucide-react";

const Example = () => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    <Pill>
      <PillAvatar
        fallback="MT"
        src="https://pbs.twimg.com/profile_images/1731655657680408577/FwhqjjGT_normal.jpg"
      />
      @matteotagliatti
    </Pill>
    <Pill>
      <PillStatus>
        <CheckCircleIcon className="text-green-500" size={12} />
        Passed
      </PillStatus>
      Approval Status
    </Pill>
    <Pill>
      #ui
      <PillButton size="icon" variant="ghost">
        <XIcon size={12} />
      </PillButton>
    </Pill>
    <Pill>
      <PillIndicator pulse variant="success" />
      Active
    </Pill>
    <Pill>
      <PillIndicator variant="error" />
      Error
    </Pill>
    <Pill>
      <PillDelta delta={10} />
      Up 10%
    </Pill>
    <Pill>
      <PillDelta delta={-5} />
      Down 5%
    </Pill>
    <Pill>
      <PillDelta delta={0} />
      No change
    </Pill>
    <Pill>
      <PillAvatarGroup>
        <PillAvatar
          fallback="MT"
          src="https://pbs.twimg.com/profile_images/1731655657680408577/FwhqjjGT_normal.jpg"
        />
        <PillAvatar
          fallback="DT"
          src="https://pbs.twimg.com/profile_images/1731655657680408577/FwhqjjGT_normal.jpg"
        />
      </PillAvatarGroup>
      Followed by 2 people
    </Pill>
  </div>
);

export default Example;
