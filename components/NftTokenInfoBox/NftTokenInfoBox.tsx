import styled from "@emotion/styled";
import { Divider, Grid } from "@mui/material";
import React from "react";

interface NftProps {
  id: {
    tokenId: string;
  };
  contract: {
    address: string;
  };
  description: string;
  metadata: {
    attributes: { trait_type: string; value: string }[];
  };
  contractMetadata: {
    openSea: {
      description: string;
    };
  };
}

interface NftTokenInfoBoxProps {
  nft: NftProps;
  contractName: string;
}

export const NftTokenInfoBox = ({
  nft,
  contractName,
}: NftTokenInfoBoxProps) => {
  return (
    <TokenInfo>
      {nft.description && (
        <>
          <TokenInfoTitle>Description</TokenInfoTitle>
          <Divider />
          <TokenInfoValue>{nft.description}</TokenInfoValue>
        </>
      )}

      <TokenInfoTitle>Properties</TokenInfoTitle>
      {/* 분할선 */}
      <Divider />

      <AttributeList>
        <Grid container spacing={1}>
          {nft.metadata?.attributes?.map((attribute) => (
            <Grid key={`attribute-${attribute.trait_type}`} item xs={4}>
              <MetadataBox>
                <AttributeKey>{attribute.trait_type}</AttributeKey>
                <AttributeValue>{attribute.value}</AttributeValue>
              </MetadataBox>
            </Grid>
          ))}
        </Grid>
      </AttributeList>

      <Divider />
      <TokenInfoTitle>About {contractName}</TokenInfoTitle>
      <Divider />
      <TokenInfoValue>
        {nft.contractMetadata.openSea.description}
      </TokenInfoValue>

      <Divider />
      <TokenInfoTitle>Detail</TokenInfoTitle>
      <TokenDetailInfo>
        <TokenDetailRow>
          <TokenDetailTitle>Contract</TokenDetailTitle>
          <TokenDetailDescription>
            <a
              href={`https://etherscan.io/address/${nft.contract.address}`}
              target="blank_"
            >
              {nft.contract.address}
            </a>
          </TokenDetailDescription>
        </TokenDetailRow>

        <TokenDetailRow>
          <TokenDetailTitle>Token ID</TokenDetailTitle>
          <TokenDetailDescription>{nft.id.tokenId}</TokenDetailDescription>
        </TokenDetailRow>
      </TokenDetailInfo>
    </TokenInfo>
  );
};

const TokenInfo = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const TokenInfoTitle = styled.div`
  padding: 16px;
  font-weight: 700;
`;

const TokenInfoValue = styled.div`
  padding: 24px;
  color: #888888;
  font-size: 14px;
  line-height: 1.2em;
`;

const AttributeList = styled.div`
  margin: 12px 6px;
`;

const MetadataBox = styled.div`
  background: #f4fbff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #8bb0df;
`;

const AttributeKey = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0070f3;
`;

const AttributeValue = styled.div`
  margin-top: 8px;
  font-weight: 600;
  color: #333333;
`;

const TokenDetailInfo = styled.div`
  padding: 18px 18px 0;
`;

const TokenDetailRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
`;

const TokenDetailTitle = styled.div`
  flex: 1;
`;

const TokenDetailDescription = styled.div`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
