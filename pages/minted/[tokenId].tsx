import { memo } from "react";
import { Stack, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContract, useNFT, useAddress } from "@thirdweb-dev/react";
import { env } from "../../utils/env";
import NftCard from "../../components/NftCard";
import TypeformButton from "../../components/TypeformButton";

export default memo(function Minted() {
  const router = useRouter();
  const { tokenId } = router.query;
  const { contract } = useContract(env.signatureDropAddress);
  const { data: nft } = useNFT(contract, tokenId as string);
  const address = useAddress();

  return (
    <Stack
      paddingY="32px"
      direction="row"
      justify="center"
      align="center"
      spacing="4px"
      height="100%"
      background="#000000"
    >
      <Stack justify="center" align="center" spacing="48px">
        <NftCard tokenId={tokenId as string} address={address} nft={nft} />

        <Stack width="312px" spacing="6">
          <NextLink href="/">
            <Button
              size="lg"
              variant="outline"
              color="gray.400"
              width="312px"
              height="48px"
              maxWidth="100%"
            >
              Done
            </Button>
          </NextLink>

          <TypeformButton id="rJj54Ipn" address={address} owner={nft?.owner}>
            <strong>Stay in touch</strong>
          </TypeformButton>
        </Stack>
      </Stack>
    </Stack>
  );
});
