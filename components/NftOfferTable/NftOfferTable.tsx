import styled from "@emotion/styled";
import { Add, EventBusy } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import Web3 from "web3";

interface NftOffer {
  maker: string;
  price: string;
  id: number;
}

interface NftOfferTableProps {
  history: NftOffer[];
  isOwner: boolean;
  onClick: (order: any) => void;
}

export const NftOfferTable = ({
  history,
  isOwner,
  onClick,
}: NftOfferTableProps) => {
  return (
    <Container>
      <TableHead>
        <Event>Price</Event>
        <Address>Maker</Address>
        {isOwner && <Address>Accept</Address>}
      </TableHead>

      {/* history가 없을시, 즉 undefined 리턴시 빈 배열로 호출하여 에레 방지 */}
      {(history || []).map((offer) => (
        <Row key={`event-${offer.id}`}>
          <Event>{Web3.utils.fromWei(offer.price)} WETH</Event>
          <Address>
            <a
              href={`https://etherscan.io/address/${offer.maker}`}
              target="blank"
            >
              {offer.maker}
            </a>
          </Address>
          {/* 토큰 소유자일 시 주문 수락 버튼 보여주기 */}
          {isOwner && (
            <Address>
              <Button
                variant="contained"
                fullWidth
                onClick={() => onClick(offer)}
              >
                Accept
              </Button>
            </Address>
          )}
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.div``;

const TableHead = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 700;
`;

const Event = styled.div`
  flex: 1;
`;

const Address = styled.div`
  flex: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 36px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;
