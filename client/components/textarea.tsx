import {Button} from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea"
import {CameraIcon} from '../icons/cameraIcon';
import * as Separator from '@radix-ui/react-separator';

export function TextareaWithButton() {
  return (
    <div style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
    <div className="Text" style={{ fontWeight: 500 }}>
      Radix Primitives
    </div>
    <div className="Text">An open-source UI component library.</div>
    <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
    <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
      <div className="Text">Blog</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">Docs</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">Source</div>
    </div>
  </div>
    // <div className="border border-red-600 flex content-center justify-content justify-center align-items">
    //     <div className="border border-blue-600 flex flex-row w-3/4 mt-5 mb-5">
    //         <Textarea className="mr-3" placeholder="Type your message here." />
    //         <Textarea className="ml-3" placeholder="Type your message here." />
    //         <Button className="ml-3" isIconOnly color="warning" variant="faded" aria-label="Take a photo">
    //             <CameraIcon />
    //         </Button>
    //     </div>
    // </div>
  )
}


{/* <div className="border border-red-600 flex flex-row">
<Textarea placeholder="Type your message here." />
<Textarea placeholder="Type your message here." />
</div>
<Button color="black">Send message</Button> */}
