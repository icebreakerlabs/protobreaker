import {
  Stack,
  Box,
  Text,
  InputGroup,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react'
import { IoQrCodeOutline } from 'react-icons/io'

export const App = () => (
  <Stack
    paddingX="24px"
    paddingY="48px"
    direction="row"
    justify="center"
    align="center"
    spacing="4px"
    overflow="hidden"
    background="#000000"
  >
    <Stack justify="center" align="center" spacing="87px">
      <Stack justify="flex-start" align="center" spacing="48px">
        <Stack
          color="White"
          markStyle="Outline"
          logotype="False"
          width="196px"
          height="196px"
        />
        <Stack
          direction="row"
          justify="center"
          align="flex-start"
          spacing="24px"
        >
          <Stack justify="flex-start" align="center" spacing="12px">
            <Box width="98px" height="98px" />
            <Text
              fontFamily="Inter"
              lineHeight="1.43"
              fontWeight="semibold"
              fontSize="14px"
              color="gray.400"
              alignSelf="stretch"
              textAlign="center"
            >
              j4ck.eth
            </Text>
          </Stack>
          <Stack justify="flex-start" align="center" spacing="12px">
            <Box width="98px" height="98px" />
            <Text
              fontFamily="Inter"
              lineHeight="1.43"
              fontWeight="semibold"
              fontSize="14px"
              color="gray.400"
              alignSelf="stretch"
              textAlign="center"
            >
              web3pm
            </Text>
          </Stack>
          <Stack justify="flex-start" align="center" spacing="12px">
            <Box width="98px" height="98px" />
            <Text
              fontFamily="Inter"
              lineHeight="1.43"
              fontWeight="semibold"
              fontSize="14px"
              color="gray.400"
              alignSelf="stretch"
              textAlign="center"
            >
              0x123...ABC
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack justify="flex-end" align="center" spacing="119px">
        <Stack justify="flex-start" align="flex-start" spacing="24px">
          <InputGroup size="lg" width="342px" maxWidth="100%">
            <Input placeholder="ENS or Address" size="lg" />
          </InputGroup>
          <Button
            leftIcon={<Icon as={IoQrCodeOutline} />}
            size="lg"
            variant="outline"
            colorScheme="blue"
            width="342px"
            height="48px"
            maxWidth="100%"
          >
            Scan QR
          </Button>
        </Stack>
        <Button
          size="lg"
          colorScheme="blue"
          width="342px"
          height="48px"
          maxWidth="100%"
        >
          Mint
        </Button>
      </Stack>
    </Stack>
  </Stack>
)
