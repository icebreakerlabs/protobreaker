import { ChainId } from "@thirdweb-dev/react";

type Env = "development" | "production";

type Chain = ChainId.Mainnet | ChainId.Goerli;

type EnvConfig = {
  signatureDropAddress: string;
  activeChain: Chain;
};

export const envs: Record<Env, EnvConfig> = {
  production: {
    activeChain: ChainId.Mainnet,
    signatureDropAddress: "0xe7e315c1Eee259B00F54849db503d584E430C957",
  },
  development: {
    activeChain: ChainId.Goerli,
    signatureDropAddress: "0x797A9F06d068F2C8a9912645DEb8F2aAa6c79D16",
  }
};

const ENVIRONMENT: Env = "production";

export const env = envs[ENVIRONMENT];
