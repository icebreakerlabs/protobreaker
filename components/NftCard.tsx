import { memo } from "react";
import {
  Badge,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { type NFT } from "@thirdweb-dev/sdk";
import NextLink from "next/link";

import AsyncAddressText from "./AsyncAddressText";
import { env } from "../utils/env";
import { type NftAttributes } from "../types/nft";

type NftCardProps = {
  tokenId: string;
  nft?: NFT;
  address?: string;
};

export default memo(function NftCard({ tokenId, nft, address }: NftCardProps) {
  const isLoaded = !!nft;

  return (
    <LinkBox>
      <NextLink
        passHref
        href={`https://opensea.io/assets/ethereum/${env.signatureDropAddress}/${tokenId}`}
      >
        <LinkOverlay>
          <Stack justify="flex-start" align="center" spacing="16px">
            <SkeletonText noOfLines={1} isLoaded={isLoaded}>
              <Text
                fontFamily="Inter"
                lineHeight="1.56"
                fontWeight="bold"
                fontSize="18px"
                textTransform="uppercase"
                color="whiteAlpha.700"
                textAlign="center"
              >
                {nft?.metadata.name}
              </Text>
            </SkeletonText>

            <Skeleton height={360} width={360} isLoaded={isLoaded}>
              {nft ? (
                <ThirdwebNftMedia
                  height="360px"
                  width="360px"
                  metadata={nft.metadata}
                />
              ) : null}
            </Skeleton>

            <SkeletonText noOfLines={1} isLoaded={isLoaded}>
              {nft?.metadata?.attributes ? (
                <Badge variant="outline" fontSize="16px">
                  Element: {(nft.metadata.attributes as NftAttributes)[0].value}
                </Badge>
              ) : null}
            </SkeletonText>

            <SkeletonText noOfLines={1} isLoaded={isLoaded}>
              <Text
                fontFamily="Inter"
                lineHeight="1.56"
                fontWeight="bold"
                fontSize="18px"
                textTransform="uppercase"
                color="whiteAlpha.700"
                textAlign="center"
                align="center"
              >
                owned by:{" "}
                <AsyncAddressText
                  address={nft?.owner ?? ""}
                  userAddress={address}
                />
              </Text>
            </SkeletonText>
          </Stack>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
});
