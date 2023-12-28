import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  OfferModal,
  SellModal,
  OfferAcceptModal,
} from "../../../components/Modal";
import { WalletContext } from "../../../contexts";
import Web3 from "web3";
import {
  NftHistoryTable,
  NftTokenInfoBox,
  NftOfferTable,
  TopHeader,
} from "../../../components";

import {
  useNftOffers,
  useNftSellOrders,
  useNftTransferHistory,
  useOneNft,
} from "../../../hooks";
import { useOrder } from "../../../hooks/useOrder";

import { Ethereum, Goerli, Binance, Arbitrum } from '@thirdweb-dev/chains'
import { ThirdwebProvider, safeWallet, metamaskWallet, walletConnect, coinbaseWallet } from '@thirdweb-dev/react'



const TokenDetailPage: NextPage = () => {
  //url에서 컨트렉트 주소와 토큰 아이디 가져오기
  const router = useRouter();
  const { address, tokenId } = router.query;

  //sell 모달창 오픈 여부 상태 변수
  const [sellModalOpen, setSellModalOpen] = useState(false);

  //✅ offer 모달창 오픈 여부 상태 변수
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  // ✅offer 수락 모달창 오픈 여부 상태 변수
  const [offerAcceptModalOpen, setOfferAcceptModalOpen] = useState(false);

  const { buyOrder } = useOrder();

  //현재 연결된 지갑주소 가져오기
  const { account } = useContext(WalletContext);

  //hooks
  const { data: nft, refetch: refetchNft } = useOneNft(address, tokenId);
  const { data: history } = useNftTransferHistory(address, tokenId);
  const { data: sellOrders, refetch: refetchSellOrder } = useNftSellOrders(
    address,
    tokenId
  );
  const { data: offers, refetch: refetchOffers } = useNftOffers(
    address,
    tokenId
  ); //✅

  const [offer, setOffer] = useState(null); //✅

  const contractName = nft?.contractMetadata.name?.replace(/([A-Z])/g, " $1");

  //현재 연결된 주소와 nft 오너가 같은지 비교
  const isOwner =
    !!account && nft?.owners[0]?.toLowerCase() === account?.toLowerCase();

  //판매주문이 있는지 체크
  const hasSellOrders = (sellOrders ?? []).length > 0;

  //가장 낮은 가격 찾기 (sellOrders 는 api가 낮은 값부터 리턴되므로 배열의 첫번째 값이 가장 낮은 가격)
  const lowestPriceOrder = hasSellOrders ? sellOrders[0] : null;

  //sell 모달창이 닫히면 판매주문 리스트를 다시 가져오기
  useEffect(() => {
    if (!sellModalOpen) {
      refetchSellOrder();
    }
  }, [sellModalOpen, refetchSellOrder]);

  //✅offer 모달창이 닫히면 offer주문 리스트를 다시 가져오기
  useEffect(() => {
    if (!offerModalOpen) {
      refetchOffers();
    }
  }, [offerModalOpen, refetchOffers]);

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
      {/* nft가 있을때만 보여주기 */}
      {nft && (
        <Container>
          <MainContainer>
            <Grid container spacing={3}>
              {/*좌우 비율 5대 7로 나누기 */}
              <Grid item xs={5}>
                {nft.media && <TokenImage src={nft.media[0].gateway} />}
                {nft && (
                  <NftTokenInfoBox nft={nft} contractName={contractName} />
                )}
              </Grid>
              <Grid item xs={7}>
                <Link href={`/list/${address}`}>
                  <ContractName>{contractName}</ContractName>
                </Link>

                <TokenId>#{nft.id.tokenId}</TokenId>

                <Owner>
                  Owned by{" "}
                  <a
                    href={`https://etherscan.io/address/${nft.owners[0]}`}
                    target="blank"
                  >
                    <OwnerAddress>{nft.owners[0]}</OwnerAddress>
                  </a>
                </Owner>

                <Section>
                  <SectionTitle>Current Price</SectionTitle>
                  <Price>
                    {hasSellOrders
                      ? `${Web3.utils.fromWei(lowestPriceOrder?.price)} ETH`
                      : "Not on Sale"}
                  </Price>

                  <OrderButtonView>
                    <Grid container spacing={1}>
                      {/* nft 주인일때는 sell버튼 보여주기 */}
                      {isOwner && (
                        <Grid item xs={6}>
                          {/* 클릭시 sell 주문 모달창 띄워주기 */}
                          <OrderButton
                            variant="contained"
                            onClick={() => setSellModalOpen(true)}
                          >
                            Sell
                          </OrderButton>
                        </Grid>
                      )}
                      {/* nft 주인 아니며 판매 주문이 있을때 buy버튼 보여주기 */}
                      {!isOwner && hasSellOrders && (
                        <Grid item xs={6}>
                          {/* 클릭시 구매 주문 생성 및 주문 실행 */}
                          <OrderButton
                            variant="contained"
                            onClick={() =>
                              buyOrder(lowestPriceOrder).then(() => {
                                // buyOrder 트잭 성공 시 sellOrder 및 nft 리패치 하여 상세페이지 업데이트
                                refetchSellOrder();
                                refetchNft();
                              })
                            }
                          >
                            Buy Now
                          </OrderButton>
                        </Grid>
                      )}

                      {/* nft 주인 아닐때 offer 버튼 보여주기 */}
                      {!isOwner && (
                        <Grid item xs={6}>
                          <OrderButton
                            variant="outlined"
                            onClick={() => setOfferModalOpen(true)}
                          >
                            Make Offer
                          </OrderButton>
                        </Grid>
                      )}
                    </Grid>
                  </OrderButtonView>
                </Section>

                <Section>
                  <SectionTitle>Offers</SectionTitle>
                  {/* ✅ */}
                  <NftOfferTable
                    history={offers}
                    isOwner={isOwner}
                    onClick={(offer) => {
                      setOffer(offer);
                      setOfferAcceptModalOpen(true);
                    }}
                  />
                </Section>

                <Section>
                  <SectionTitle>Recent Item Activities</SectionTitle>
                  <NftHistoryTable history={history} />
                </Section>
              </Grid>
            </Grid>
          </MainContainer>
          {/* ✅ */}
          {typeof tokenId === 'string' && typeof address === 'string' && (
            <>
              <OfferModal
                open={offerModalOpen}
                setOpen={setOfferModalOpen}
                contract={address}
                tokenId={tokenId}
              />
              <OfferAcceptModal
                open={offerAcceptModalOpen}
                setOpen={setOfferAcceptModalOpen}
                contract={address}
                tokenId={tokenId}
                offer={offer}
              />
              <SellModal
                open={sellModalOpen}
                setOpen={setSellModalOpen}
                contract={address}
                tokenId={tokenId}
              />
            </>
          )}
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 1280px;
`;

const TokenImage = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const ContractName = styled.div`
  color: #0070f3;
  font-size: 18px;
  cursor: pointer;
`;

const TokenId = styled.div`
  margin-top: 16px;
  font-size: 28px;
  font-weight: 700;
`;

const Owner = styled.div`
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
`;

const OwnerAddress = styled.span`
  font-size: 0.88em;
  font-weight: 500;
  color: #0070f3;
`;

const Section = styled.div`
  margin-top: 24px;
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 8px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  color: #606060;
`;

const Price = styled.div`
  margin-top: 8px;
  font-size: 28px;
  font-weight: 700;
`;

const OrderButtonView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const OrderButton = styled(Button)`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
`;

export default TokenDetailPage;
