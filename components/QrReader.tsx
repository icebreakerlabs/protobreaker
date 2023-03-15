import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { memo, useEffect, useMemo, useRef } from "react";
import { DecodeHintType, BarcodeFormat } from '@zxing/library';
import { BrowserQRCodeReader } from '@zxing/browser';

type QrReaderProps = {
  isOpen: boolean;
  onClose: () => void;
  onText: (text: string) => void;
};

function useScanner(onText: (text: string) => void) {
  const ref = useRef<HTMLVideoElement>(null);
  const reader = useMemo(
    () =>
      new BrowserQRCodeReader(
        new Map<DecodeHintType, any>([
          [DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]],
        ]),
        { delayBetweenScanAttempts: 100 }
      ),
    []
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    reader.decodeFromConstraints(
      { audio: false, video: { facingMode: "environment" } },
      ref.current,
      (result) => {
        if (result) {
          const match = result.getText().match(/:([^@]*)/);

          if (match) {
            onText(match[1]);
          }
        }
      }
    );

    return () => {
      BrowserQRCodeReader.releaseAllStreams();
    };
  }, [reader, onText]);

  return { ref };
}

function QrPreview({ onText }: { onText: QrReaderProps['onText'] }) {
  const { ref } = useScanner(onText);

  return (
    <Box marginBlock="4" marginTop="10">
      <video width={400} height={400} ref={ref} />
    </Box>
  );
}

export default memo(function QrReader({
  isOpen,
  onText,
  onClose,
}: QrReaderProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <QrPreview onText={onText} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
