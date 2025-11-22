import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

export interface CanvasInputProps {
    width?: number;
    height?: number;
    value?: string;
    onChange?: (value: string) => void;
    fontSize?: number;
    fontFamily?: string;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    focusBorderColor?: string;
    selectionColor?: string;
    placeholder?: string;
    className?: string;
    multiline?: boolean;
}

export interface CanvasInputRef {
    focus: () => void;
    blur: () => void;
}

export const CanvasInput = forwardRef<CanvasInputRef, CanvasInputProps>(({
    width = 400,
    height = 40,
    value = "",
    onChange,
    fontSize = 20,
    fontFamily = "Arial",
    textColor = "black",
    backgroundColor = "white",
    borderColor = "black",
    focusBorderColor = "blue",
    selectionColor = "rgba(0,120,215,0.3)",
    placeholder = "",
    className,
    multiline = false,
}, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // State for React updates (focus styling)
    const [focused, setFocused] = useState(false);

    // Refs for render loop state (to avoid re-renders)
    const stateRef = useRef({
        cursorVisible: true,
        scrollOffsetX: 0,
        scrollOffsetY: 0,
        lastBlinkTime: 0,
        selectionStart: 0,
        selectionEnd: 0,
        value: value || "",
        focused: false,
        isDragging: false
    });

    // Internal value for uncontrolled mode
    const [internalValue, setInternalValue] = useState(value);
    const currentValue = onChange ? value : internalValue;

    // Sync refs with props/state
    useEffect(() => {
        stateRef.current.value = currentValue;
    }, [currentValue]);

    useEffect(() => {
        stateRef.current.focused = focused;
        if (focused) {
            stateRef.current.cursorVisible = true;
            stateRef.current.lastBlinkTime = performance.now();
        }
    }, [focused]);

    useImperativeHandle(ref, () => ({
        focus: () => canvasRef.current?.focus(),
        blur: () => canvasRef.current?.blur()
    }));

    // Sync internal value if prop changes
    useEffect(() => {
        if (onChange) {
            setInternalValue(value);
        }
    }, [value, onChange]);

    // Helper to update value
    const updateValue = (newValue: string, newCursorPos: number, newSelectionEnd?: number) => {
        stateRef.current.value = newValue;
        stateRef.current.selectionStart = newCursorPos;
        stateRef.current.selectionEnd = newSelectionEnd !== undefined ? newSelectionEnd : newCursorPos;

        // Reset blink
        stateRef.current.cursorVisible = true;
        stateRef.current.lastBlinkTime = performance.now();

        if (onChange) {
            onChange(newValue);
        } else {
            setInternalValue(newValue);
        }
    };

    // --- KEYBOARD HANDLING ---
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLCanvasElement>) => {
        if (!focused) return;

        const state = stateRef.current;
        const val = state.value;
        const selStart = Math.min(state.selectionStart, state.selectionEnd);
        const selEnd = Math.max(state.selectionStart, state.selectionEnd);
        const hasSelection = selStart !== selEnd;

        // Helper for cursor movement
        const moveCursor = (offset: number, shiftKey: boolean) => {
            let newPos = state.selectionEnd + offset;
            newPos = Math.max(0, Math.min(val.length, newPos));

            if (shiftKey) {
                state.selectionEnd = newPos;
            } else {
                state.selectionStart = newPos;
                state.selectionEnd = newPos;
            }
            state.cursorVisible = true;
            state.lastBlinkTime = performance.now();
        };

        // Helper for line movement (Up/Down)
        const moveLine = (direction: -1 | 1, shiftKey: boolean) => {
            // Simple implementation: find current line, move to same column in next/prev line
            const lines = val.split('\n');
            let charCount = 0;
            let currentLineIndex = 0;
            let currentLineStart = 0;

            // Find current line
            for (let i = 0; i < lines.length; i++) {
                const lineLen = lines[i].length + 1; // +1 for newline
                if (state.selectionEnd < charCount + lineLen) {
                    currentLineIndex = i;
                    currentLineStart = charCount;
                    break;
                }
                charCount += lineLen;
                if (i === lines.length - 1) {
                    currentLineIndex = i;
                    currentLineStart = charCount; // Should be correct
                }
            }

            const targetLineIndex = currentLineIndex + direction;
            if (targetLineIndex < 0 || targetLineIndex >= lines.length) return;

            const currentColumn = state.selectionEnd - currentLineStart;

            // Calculate target position
            let targetLineStart = 0;
            for (let i = 0; i < targetLineIndex; i++) {
                targetLineStart += lines[i].length + 1;
            }

            const targetLineLength = lines[targetLineIndex].length;
            const targetColumn = Math.min(currentColumn, targetLineLength);
            const newPos = targetLineStart + targetColumn;

            if (shiftKey) {
                state.selectionEnd = newPos;
            } else {
                state.selectionStart = newPos;
                state.selectionEnd = newPos;
            }
            state.cursorVisible = true;
            state.lastBlinkTime = performance.now();
        };

        if (e.key === 'ArrowLeft') {
            moveCursor(-1, e.shiftKey);
        } else if (e.key === 'ArrowRight') {
            moveCursor(1, e.shiftKey);
        } else if (e.key === 'ArrowUp') {
            if (multiline) moveLine(-1, e.shiftKey);
        } else if (e.key === 'ArrowDown') {
            if (multiline) moveLine(1, e.shiftKey);
        } else if (e.key === 'Backspace') {
            if (hasSelection) {
                const newVal = val.slice(0, selStart) + val.slice(selEnd);
                updateValue(newVal, selStart);
            } else if (state.selectionStart > 0) {
                // Handle surrogate pairs? For now simple slice
                const newVal = val.slice(0, state.selectionStart - 1) + val.slice(state.selectionStart);
                updateValue(newVal, state.selectionStart - 1);
            }
        } else if (e.key === 'Delete') {
            if (hasSelection) {
                const newVal = val.slice(0, selStart) + val.slice(selEnd);
                updateValue(newVal, selStart);
            } else if (state.selectionStart < val.length) {
                const newVal = val.slice(0, state.selectionStart) + val.slice(state.selectionStart + 1);
                updateValue(newVal, state.selectionStart);
            }
        } else if (e.key === 'Enter') {
            if (multiline) {
                const newVal = val.slice(0, selStart) + '\n' + val.slice(selEnd);
                updateValue(newVal, selStart + 1);
            }
        } else if (e.key === 'Home') {
            // Move to start of line
            const lastNewLine = val.lastIndexOf('\n', state.selectionEnd - 1);
            const newPos = lastNewLine === -1 ? 0 : lastNewLine + 1;
            if (e.shiftKey) state.selectionEnd = newPos;
            else { state.selectionStart = newPos; state.selectionEnd = newPos; }
        } else if (e.key === 'End') {
            // Move to end of line
            const nextNewLine = val.indexOf('\n', state.selectionEnd);
            const newPos = nextNewLine === -1 ? val.length : nextNewLine;
            if (e.shiftKey) state.selectionEnd = newPos;
            else { state.selectionStart = newPos; state.selectionEnd = newPos; }
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            state.selectionStart = 0;
            state.selectionEnd = val.length;
            e.preventDefault();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            if (hasSelection) {
                try {
                    await navigator.clipboard.writeText(val.slice(selStart, selEnd));
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
            e.preventDefault();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    const newVal = val.slice(0, selStart) + text + val.slice(selEnd);
                    updateValue(newVal, selStart + text.length);
                }
            } catch (err) {
                console.error('Failed to paste:', err);
            }
            e.preventDefault();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
            if (hasSelection) {
                try {
                    await navigator.clipboard.writeText(val.slice(selStart, selEnd));
                    const newVal = val.slice(0, selStart) + val.slice(selEnd);
                    updateValue(newVal, selStart);
                } catch (err) {
                    console.error('Failed to cut:', err);
                }
            }
            e.preventDefault();
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            // Regular typing
            const newVal = val.slice(0, selStart) + e.key + val.slice(selEnd);
            updateValue(newVal, selStart + 1);
            e.preventDefault(); // Prevent default actions
        }
    };

    // --- MOUSE HANDLING ---
    const getCursorFromEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return 0;

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const state = stateRef.current;
        const paddingX = 5;
        const paddingY = 5;
        const lineHeight = fontSize * 1.2;

        // Calculate clicked line
        const relativeY = clickY - paddingY + state.scrollOffsetY;
        let lineIndex = Math.floor(relativeY / lineHeight);
        const lines = state.value.split('\n');

        if (lineIndex < 0) lineIndex = 0;
        if (lineIndex >= lines.length) lineIndex = lines.length - 1;

        // Calculate clicked char in line
        const relativeX = clickX - paddingX + state.scrollOffsetX;
        const lineText = lines[lineIndex];
        ctx.font = `${fontSize}px ${fontFamily}`;

        let charIndex = 0;
        let currentWidth = 0;
        for (let i = 0; i < lineText.length; i++) {
            const charW = ctx.measureText(lineText[i]).width;
            if (currentWidth + charW / 2 >= relativeX) {
                break;
            }
            currentWidth += charW;
            charIndex++;
        }

        // Convert line/char to global index
        let globalIndex = 0;
        for (let i = 0; i < lineIndex; i++) {
            globalIndex += lines[i].length + 1;
        }
        globalIndex += charIndex;
        return globalIndex;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const pos = getCursorFromEvent(e);
        stateRef.current.selectionStart = pos;
        stateRef.current.selectionEnd = pos;
        stateRef.current.isDragging = true;
        stateRef.current.cursorVisible = true;
        stateRef.current.lastBlinkTime = performance.now();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (stateRef.current.isDragging) {
            const pos = getCursorFromEvent(e);
            stateRef.current.selectionEnd = pos;
        }
    };

    const handleMouseUp = () => {
        stateRef.current.isDragging = false;
    };

    // Main Render Loop (Same as before, but using stateRef more directly)
    useEffect(() => {
        let animationFrameId: number;

        const render = (time: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;

            const state = stateRef.current;

            // Cursor Blinking Logic
            if (state.focused) {
                if (time - state.lastBlinkTime > 500) {
                    state.cursorVisible = !state.cursorVisible;
                    state.lastBlinkTime = time;
                }
            } else {
                state.cursorVisible = false;
            }

            // --- DRAWING ---
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Border
            ctx.strokeStyle = state.focused ? focusBorderColor : borderColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Font setup
            const activeFont = `${fontSize}px ${fontFamily}`;
            ctx.font = activeFont;
            ctx.textBaseline = "top";

            const lineHeight = fontSize * 1.2;
            const paddingX = 5;
            const paddingY = 5;

            // Split text into lines
            const lines = state.value.split('\n');

            // Calculate Cursor Position (Line & Column)
            let cursorLineIndex = 0;
            let cursorCharIndex = 0;
            let charCount = 0;

            // Find which line the cursor is on (using selectionEnd as cursor)
            const cursorIndex = state.selectionEnd;

            for (let i = 0; i < lines.length; i++) {
                const lineLen = lines[i].length + 1; // +1 for newline
                if (cursorIndex < charCount + lineLen) {
                    cursorLineIndex = i;
                    cursorCharIndex = cursorIndex - charCount;
                    break;
                }
                charCount += lineLen;
                if (i === lines.length - 1) { // End of text
                    cursorLineIndex = i;
                    cursorCharIndex = lines[i].length;
                }
            }

            // --- SCROLLING LOGIC ---
            const visibleWidth = canvas.width - (paddingX * 2);
            const visibleHeight = canvas.height - (paddingY * 2);

            // Vertical Scroll
            const cursorY = cursorLineIndex * lineHeight;
            if (cursorY - state.scrollOffsetY > visibleHeight - lineHeight) {
                state.scrollOffsetY = cursorY - (visibleHeight - lineHeight);
            } else if (cursorY - state.scrollOffsetY < 0) {
                state.scrollOffsetY = cursorY;
            }
            state.scrollOffsetY = Math.max(0, state.scrollOffsetY);

            // Horizontal Scroll
            const currentLineText = lines[cursorLineIndex] || "";
            let cursorXRelative = 0;
            for (let i = 0; i < cursorCharIndex; i++) {
                cursorXRelative += ctx.measureText(currentLineText[i] || "").width;
            }

            if (cursorXRelative - state.scrollOffsetX > visibleWidth) {
                state.scrollOffsetX = cursorXRelative - visibleWidth;
            } else if (cursorXRelative - state.scrollOffsetX < 0) {
                state.scrollOffsetX = cursorXRelative;
            }
            state.scrollOffsetX = Math.max(0, state.scrollOffsetX);


            ctx.save();
            ctx.beginPath();
            ctx.rect(2, 2, canvas.width - 4, canvas.height - 4);
            ctx.clip();

            // Draw Text & Selection
            let currentY = paddingY - state.scrollOffsetY;
            let globalCharIndex = 0;

            lines.forEach((line, lineIndex) => {
                const lineY = currentY + (lineIndex * lineHeight);

                // Optimization: Skip lines outside viewport
                if (lineY + lineHeight < 0 || lineY > canvas.height) {
                    globalCharIndex += line.length + 1;
                    return;
                }

                const lineX = paddingX - state.scrollOffsetX;

                // Draw Selection for this line
                const lineStart = globalCharIndex;
                const lineEnd = globalCharIndex + line.length;

                const selStart = Math.min(state.selectionStart, state.selectionEnd);
                const selEnd = Math.max(state.selectionStart, state.selectionEnd);

                if (selStart < lineEnd && selEnd > lineStart) {
                    // There is overlap
                    const localSelStart = Math.max(0, selStart - lineStart);
                    const localSelEnd = Math.min(line.length, selEnd - lineStart);

                    let selX = lineX;
                    for (let i = 0; i < localSelStart; i++) selX += ctx.measureText(line[i]).width;

                    let selW = 0;
                    for (let i = localSelStart; i < localSelEnd; i++) selW += ctx.measureText(line[i]).width;

                    // If selection extends to newline, add a bit of width to indicate it
                    if (selEnd > lineEnd && localSelEnd === line.length) {
                        selW += 5;
                    }

                    ctx.fillStyle = selectionColor;
                    ctx.fillRect(selX, lineY, selW, lineHeight);
                }

                // Draw Text
                ctx.fillStyle = textColor;
                if (!state.value && placeholder && lineIndex === 0) {
                    ctx.fillStyle = "gray";
                    ctx.fillText(placeholder, lineX, lineY);
                } else {
                    ctx.fillText(line, lineX, lineY);
                }

                globalCharIndex += line.length + 1; // +1 for newline
            });

            // Draw Cursor
            if (state.focused && state.cursorVisible) {
                const cursorDrawY = paddingY - state.scrollOffsetY + (cursorLineIndex * lineHeight);
                const cursorDrawX = paddingX - state.scrollOffsetX + cursorXRelative;

                ctx.beginPath();
                ctx.moveTo(cursorDrawX, cursorDrawY);
                ctx.lineTo(cursorDrawX, cursorDrawY + lineHeight);
                ctx.strokeStyle = textColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [
        width, height, fontSize, fontFamily, textColor, backgroundColor,
        borderColor, focusBorderColor, selectionColor, placeholder, multiline
    ]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={className}
            style={{ display: 'block', cursor: 'text', outline: 'none' }}
            tabIndex={0}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        />
    );
});

CanvasInput.displayName = "CanvasInput";
