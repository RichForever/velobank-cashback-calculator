import React, {useState} from 'react';

import { Reorder, useDragControls } from 'framer-motion';

import { Box, Flex, HStack, IconButton, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import {useCurrentDate} from "../hooks/useCurrentDate";
import {useAppContext} from "../context/AppProvider";
import {useTransactionsContext} from "../context/TransactionsProvider";

const TransactionsListItem = ({ transaction, onDelete }) => {

    const [itemTooltipIsVisible, setItemTooltipIsVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const controls = useDragControls(); // Hook is called here in the subcomponent
    const currentDate = useCurrentDate();

    const { setLastOperationDate } = useAppContext();
    const { transactions } = useTransactionsContext();

    const isDraggable = transactions.length > 1;

    // Dynamically set cursor style based on transaction count and dragging state
    const cursorStyle = isDraggable ? (isDragging ? 'grabbing' : 'grab') : 'not-allowed';

    const dragVariants = {
        initial: { zIndex: 0, opacity: '100%' },
        dragging: { zIndex: 1, opacity: '25%' },
    };

    const draggableIconColor = useColorModeValue('lightMode.border', 'darkMode.border');
    const cashbackValueColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
    const transactionDateColor = useColorModeValue('lightMode.textSecondary', 'darkMode.textSecondary');

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
            onDragEnd={() => {
                setIsDragging(false)
                setLastOperationDate(currentDate)
            }}
            onDragStart={() => setIsDragging(true)}
        >
            <HStack gap={4}>
                <Box className="reorder-handle" onPointerDown={(e) => isDraggable && controls.start(e)} style={{ cursor: cursorStyle }}>
                    <DragHandleIcon color={draggableIconColor} />
                </Box>
                <Box>
                    <Text fontSize="lg" fontWeight="700">
                        {transaction.value.toFixed(2)} PLN
                    </Text>
                    <Text fontSize="sm" color={cashbackValueColor} fontWeight="600">
                        {transaction.cashback.toFixed(2)} PLN
                    </Text>
                    {transaction.date && (
                        <Text fontSize="xs" color={transactionDateColor} fontWeight="400" opacity="50%">
                            Data transakcji: {transaction.date}
                        </Text>
                    )}
                </Box>
            </HStack>
            <Flex gap={4} align="stretch">
                <Tooltip label="Usuń transakcję" placement="bottom-end" isOpen={itemTooltipIsVisible}>
                    <IconButton
                        aria-label="Usuń transakcję"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => {
                            onDelete(transaction)
                            setItemTooltipIsVisible(false)
                        }}
                        onMouseEnter={() => setItemTooltipIsVisible(true)}
                        onMouseLeave={() => setItemTooltipIsVisible(false)}
                    />
                </Tooltip>
            </Flex>
        </Flex>
    );
};

export default TransactionsListItem;