import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { NextPage } from "next";
import React, { useState } from "react";
import { TopHeader } from "../components";
import { Ethereum, Goerli, Binance, Arbitrum } from '@thirdweb-dev/chains'
import { ThirdwebProvider, safeWallet, metamaskWallet, walletConnect, coinbaseWallet } from '@thirdweb-dev/react'


const Create: NextPage = () => {
  //토큰 속성 값 저장
  const [properties, setProperties] = useState([
    {
      trait_type: "",
      value: "",
    },
  ]);

  //properties 에 새로운 배열 추가
  const addProperty = () => {
    setProperties((properties) => [
      ...properties,
      {
        trait_type: "",
        value: "",
      },
    ]);
  };

  return (
    <div>
      <ThirdwebProvider
        supportedChains={[Ethereum, Goerli, Binance, Arbitrum]}
        supportedWallets={[
          metamaskWallet(),
          walletConnect(),
          coinbaseWallet(),
          safeWallet({
            recommended: true,
            personalWallets: [metamaskWallet(), walletConnect(), coinbaseWallet()]
          })
        ]}
        >
          <TopHeader />
      </ThirdwebProvider>
      <CreatePageWrapper>
        <CreateView>
          <Title>Create New Item</Title>

          <Box>
            <FieldTitle>Image URI</FieldTitle>
            <Helper>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </Helper>
            <TextField required fullWidth margin="dense" id="image-url" />

            <FieldTitle>Token Name</FieldTitle>
            <TextField required fullWidth margin="dense" id="token-name" />

            <FieldTitle>Description</FieldTitle>
            <Helper>
              The description will be included on the items detail page
              underneath its image. Markdown syntax is supported.
            </Helper>
            <TextField
              required
              multiline
              rows={4}
              fullWidth
              margin="dense"
              id="description"
            />

            <FieldTitle>Properties</FieldTitle>
            <Helper>Textual traits that show up as rectangles</Helper>
            <PropertyBox>
              {/* 속성값 뿌려주기 */}
              {properties.map(({ trait_type, value }, index) => (
                <PropertyRow key={`property-${index}`}>
                  <PropertyKeyField id={`property-${index}-key`} label="key">
                    {trait_type}
                  </PropertyKeyField>
                  <PropertyValueField
                    id={`property-${index}-value`}
                    label="value"
                  >
                    {value}
                  </PropertyValueField>
                </PropertyRow>
              ))}
            </PropertyBox>
            <Button variant="outlined" fullWidth onClick={addProperty}>
              Add Property
            </Button>

            <CreateButtonView>
              <Button variant="contained" fullWidth size="large">
                Create
              </Button>
            </CreateButtonView>
          </Box>
        </CreateView>
      </CreatePageWrapper>
    </div>
  );
};

const CreatePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CreateView = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 24px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  margin-top: 32px;
`;

const FieldTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 4px;
`;

const PropertyBox = styled.div`
  margin-bottom: 8px;
`;

const PropertyRow = styled.div`
  display: flex;
  margin-top: 8px;
`;

const PropertyKeyField = styled(TextField)`
  flex: 1;
  margin-right: 4px;
`;

const PropertyValueField = styled(TextField)`
  flex: 2;
  margin-left: 4px;
`;

const CreateButtonView = styled.div`
  margin-top: 16px;
`;

const Helper = styled.div`
  font-size: 12px;
  color: rgb(112, 122, 131);
  font-weight: 500;
`;

export default Create;
