import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";


export const Banner = ()=>{
  return <BannerWrapper>
  <BannerView>
    <Title>Discover, collect, and sell extraordinary NFTs</Title>
    <SubTitle>on the world&apos;s largest NFT marketplace</SubTitle>
    <ButtonView>
      <BannerButton variant="contained" size="large">Explore</BannerButton>
      <BannerButton variant="outlined" size="large">Create</BannerButton>
    </ButtonView>
  </BannerView>
  </BannerWrapper>
}
const BannerWrapper =styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 margin-top: 100px;

`
const BannerView =styled.div`
  max-width:  600px;

`
const Title =styled.div`
    font-size: 48px;
  font-weight: 700;
`
const SubTitle =styled.div`
margin-top: 24px;
  font-size: 20px;
  font-weight: 500;
  max-width:  350px;
`
const ButtonView =styled.div`
margin-top: 24px;

`
const BannerButton =styled(Button)`
  margin-right: 16px;
  padding: 12px 48px;
`