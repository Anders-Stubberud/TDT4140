import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { flashcard, flashcardSet } from '@/state/zustand';

interface FlashcardSetListProps {
  flashcardSets: flashcardSet[];
}

const FlashcardSetList: React.FC<FlashcardSetListProps> = ({ flashcardSets }) => {
    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {flashcardSets.map((flashcardSet, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")} className="p-6">
              <CardBody className="overflow-visible p-0">
                      <p>{flashcardSet.name}</p>
              </CardBody>
            </Card>
            ))}
        </div>
    );
};

export default FlashcardSetList;
