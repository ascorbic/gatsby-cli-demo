import React, { useState } from "react";
import { Text, Color, Box } from "ink";
import SelectInput, { Item, ItemProps } from "ink-select-input";
import MultiSelectInput, { ListedItem } from "ink-multi-select";
import questions, { Question } from "./options.json";
interface Props {
    isSelected: boolean;
    label: string;
}

interface Answer {
    question: Question;
    answers: Item[];
}

const ListItem: React.FC<ItemProps> = ({ isSelected, label }) => (
    <Color green={isSelected}>{label}</Color>
);

export const App: React.FC = () => {
    const [answers, setAnswers] = useState<Answer[]>([]);

    const handleSelect = (item: Item) => {
        setAnswers(answers => [
            ...answers,
            { question: current, answers: [item] }
        ]);
    };

    const handleSubmit = (items: ListedItem[]) => {
        const answer: Item[] = items.filter(o => o.value);
        setAnswers(answers => [
            ...answers,
            { question: current, answers: answer }
        ]);
    };

    const current = questions?.[answers.length];
    const options: Item[] = current?.options;

    return (
        <Box flexDirection="column">
            <Text bold>
                Welcome to <Color keyword="purple">Gatsby</Color>
            </Text>
            {!!answers.length && (
                <Box flexDirection="column">
                    {answers.map(
                        answer =>
                            !!answer.answers.length && (
                                <Box key={answer.question.key} width="100">
                                    <Color bgKeyword="purple" white>
                                        <Box
                                            width={20}
                                            justifyContent="flex-end"
                                        >
                                            <Text bold>
                                                {answer.question.label}{" "}
                                            </Text>
                                        </Box>
                                    </Color>
                                    <Box flexGrow={1}>
                                        {" "}
                                        {answer.answers
                                            .map(a => a.label)
                                            .join(", ")}{" "}
                                    </Box>
                                </Box>
                            )
                    )}
                </Box>
            )}

            <Box flexDirection="column">
                {current && (
                    <Text>
                        <Color green>{current.question}</Color>
                    </Text>
                )}
                {options &&
                    (current.multi ? (
                        <>
                            <Text>
                                Use the spacebar to toggle options, and enter to
                                submit
                            </Text>
                            <MultiSelectInput
                                itemComponent={ListItem}
                                key={JSON.stringify(options)}
                                items={options}
                                onSubmit={handleSubmit}
                            />
                        </>
                    ) : (
                        <>
                            <Text>
                                Use the arrow keys to choose an option, and
                                enter to submit
                            </Text>
                            <SelectInput
                                itemComponent={ListItem}
                                items={options}
                                onSelect={handleSelect}
                            />
                        </>
                    ))}

                {!current && (
                    <Text>
                        <Color keyword="purple">Installing plugins: </Color>
                        {answers
                            .map(q => q.answers.map(a => a.value))
                            .filter(Boolean)
                            .join(", ")}
                    </Text>
                )}
            </Box>
        </Box>
    );
};
