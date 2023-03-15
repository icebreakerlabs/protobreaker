import { type ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import {
  useContract,
  Web3Button,
  useNFTs,
  useAddress,
  useClaimedNFTSupply,
} from "@thirdweb-dev/react";
import {
  Stack,
  InputGroup,
  Input,
  Image,
  useDisclosure,
  Icon,
  Skeleton,
  InputRightElement,
  IconButton,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { AiOutlineQrcode } from "react-icons/ai";
import { useRouter } from "next/router";
import NextLink from "next/link";

import ErrorAlert from "../components/ErrorAlert";
import LogoutButton from "../components/LogoutButton";
import QrReader from "../components/QrReader";

import { env } from "../utils/env";
import { resolveAddress } from "../utils/resolveAddress";
import NftMiniCard from "../components/NftMiniCard";

export default memo(function Home() {
  const { push } = useRouter();
  const [destinationAddress, setDestinationAddress] = useState("");
  const [hasError, setHasError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useAddress();
  const { contract: signatureDrop } = useContract(
    env.signatureDropAddress,
    "signature-drop"
  );
  const { data: count } = useClaimedNFTSupply(signatureDrop);

  const { data = [], isLoading: areNFTsLoading } = useNFTs(signatureDrop, {
    start: count !== undefined ? Math.max(0, Number(count) - 3) : 0,
    count: 3,
  });
  const nfts = useMemo(() => [...data].reverse(), [data]);

  const handleQrRead = useCallback(
    (text: string) => {
      if (text) {
        setDestinationAddress(text);
        onClose();
      }
    },
    [onClose]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDestinationAddress(e.target.value);
  }, []);

  const handleButtonPress = useCallback(async () => {
    setHasError(false);

    try {
      const resolvedAddress = await resolveAddress(destinationAddress);
      const transactions = await signatureDrop?.claimTo(resolvedAddress, 1);

      if (!transactions) {
        return setHasError(true);
      }

      const [transaction] = transactions;

      push(`/minted/${transaction.id}`);
    } catch {
      setHasError(true);
    }
  }, [signatureDrop, destinationAddress, push]);

  const handleQrButtonPress = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Stack
      paddingX="16px"
      paddingY="32px"
      direction="row"
      justify="center"
      align="center"
      spacing="4px"
      overflow="hidden"
      height="100%"
      background="blackAlpha.900"
    >
      <Stack justify="space-between" align="center" spacing="43px">
        <Stack justify="flex-start" align="center" spacing="32px">
          <Stack width="116px" height="116px">
           <LinkBox>
            <NextLink
              passHref
              href={`https://icebreaker.xyz`}
            >
              <LinkOverlay>
            <Image src="/logo@2x.png" alt="Icebreaker" />
              </LinkOverlay>
              </NextLink>
              </LinkBox>
          </Stack>

          <Stack
            direction="row"
            justify="flex-start"
            align="flex-start"
            spacing="24px"
          >
            {areNFTsLoading ? (
              <>
                <Skeleton width="93.33px" height="180px" />
                <Skeleton width="93.33px" height="180px" />
                <Skeleton width="93.33px" height="180px" />
              </>
            ) : (
              nfts.map((nft) => (
                <NftMiniCard
                  key={nft.metadata.id}
                  nft={nft}
                  address={address}
                />
              ))
            )}
          </Stack>
        </Stack>

        <Stack
          justify="space-between"
          align="center"
          spacing="32px"
          width="328px"
          maxWidth="100%"
        >
          <Stack
            justify="flex-start"
            align="flex-start"
            spacing="16px"
            alignSelf="stretch"
          >
            {hasError && (
              <ErrorAlert>
                Something went wrong when attempting to claim
              </ErrorAlert>
            )}
            <InputGroup size="lg" alignSelf="stretch">
              <Input
                borderColor="gray.400"
                color="gray.400"
                placeholder="ENS name or ETH address"
                size="lg"
                value={destinationAddress}
                onChange={handleInputChange}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label="Scan QR code"
                  icon={<Icon as={AiOutlineQrcode} />}
                  onClick={handleQrButtonPress}
                />
              </InputRightElement>
            </InputGroup>

            <QrReader isOpen={isOpen} onClose={onClose} onText={handleQrRead} />
          </Stack>

          <Stack width="100%">
            <Web3Button
              colorMode="dark"
              accentColor="white"
              contractAddress={env.signatureDropAddress}
              action={handleButtonPress}
            >
              Break the ice
            </Web3Button>

            <LogoutButton />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
});
