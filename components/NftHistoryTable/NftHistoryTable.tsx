import styled from "@emotion/styled";
import { Add, EventBusy } from "@mui/icons-material";
import React from "react";

interface NftHistory {
  hash: string;
  from: string;
  to: string;
}

interface NftHistoryTableProps {
  history: NftHistory[];
}

export const NftHistoryTable = ({ history }: NftHistoryTableProps) => {
  return (
    <Container>
      <TableHead>
        <Event>Event</Event>
        <Address>From</Address>
        <Address>To</Address>
      </TableHead>

      {/* history가 없을시, 즉 undefined 리턴시 빈 배열로 호출하여 에레 방지 */}
      {(history || []).map((event) => (
        <Row key={`event-${event.hash}`}>
          <Event>Transfer</Event>
          <Address>
            <a
              href={`https://etherscan.io/address/${event.from}`}
              target="blank"
            >
              {event.from}
            </a>
          </Address>
          <Address>
            <a href={`https://etherscan.io/address/${event.to}`} target="blank">
              {event.to}
            </a>
          </Address>
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
  margin-top: 24px;
`;
