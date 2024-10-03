import React, {useState} from 'react';

import { Reorder, useDragControls } from 'framer-motion';

import { Box, Flex, HStack, IconButton, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';

const TransactionsListItem = ({ transaction, onDelete }) => {
    const controls = useDragControls(); // Hook is called here in the subcomponent

    const dragVariants = {
        initial: { zIndex: 0, opacity: '100%' },
        dragging: { zIndex: 1, opacity: '25%' },
    };

    const draggableIconColor = useColorModeValue('lightMode.border', 'darkMode.border');
    const cashbackValueColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');

    return (
        <Flex
            as={Reorder.Item}
            dragListener={false}
            dragControls={controls}
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            key={transaction.id}
            value={transaction}
            variants={dragVariants}
            initial="initial"
            whileDrag="dragging"
            position="relative"
            style={{ touchAction: 'none' }}
        >
            <HStack gap={4}>
                <Box className="reorder-handle" onPointerDown={(e) => controls.start(e)}>
                    <DragHandleIcon color={draggableIconColor} cursor="move" />
                </Box>
                <Box>
                    <Text fontSize="lg" fontWeight="700">
                        {transaction.value.toFixed(2)} PLN
                    </Text>
                    <Text fontSize="sm" color={cashbackValueColor} fontWeight="600">
                        {transaction.cashback.toFixed(2)} PLN
                    </Text>
                </Box>
            </HStack>
            <Flex gap={4} align="stretch">
                <Tooltip label="Usuń transakcję" placement="bottom-end">
                    <IconButton
                        aria-label="Usuń transakcję"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => onDelete(transaction)}
                    />
                </Tooltip>
            </Flex>
        </Flex>
    );
};

export default TransactionsListItem;