import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useCallback, useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import Web3 from "web3";
import BN from "bn.js";

interface SellModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  contract: string;
  tokenId: string;
}

export const SellModal = ({
  open,
  setOpen,
  contract,
  tokenId,
}: SellModalProps) => {
  //유저 상태 값: 프록 컨트랙트 생성(PROXY_REGISTER), 토큰 approve(APPROVE_ALL), 주문 생성(GENERATE_ORDER), 팬딩(PENDING: 기본값)
  const [status, setStatus] = useState("PENDING");

  const {
    checkLogin,
    hasProxy,
    registerProxy,
    isApprovedForAll,
    setApprovalForAll,
    sellOrder,
  } = useOrder();

  const [price, setPrice] = useState(0);
  const [expirationTime, setExpirationTime] = useState<Moment | null>(
    moment().add(7, "days")
  ); //기본값: 현재로부터 7일 후 만료

  //유저 상태를 확인하고 업데이트 하기
  const updateStatus = useCallback(async () => {
    //로그인 안되였을때
    if (!open || !(await checkLogin())) {
      //상태값 팬딩으로 업데이트
      setStatus("PENDING");
      return;
    }

    //로그인 되였을때
    if (!(await hasProxy())) {
      //프록시 주소가 없을때
      setStatus("PROXY_REGISTER");
      return;
    } else if (!(await isApprovedForAll(contract))) {
      //프록시 컨트랙트에 토큰 사용 승인이 안되였을때
      setStatus("APPROVE_ALL");
      return;
    } else {
      //프록시 컨트랙트에 토큰 사용 승인이 되였을때
      setStatus("GENERATE_ORDER");
    }
  }, [checkLogin, hasProxy, open, contract]);

  //유저 상태 값이 바뀔때 상태값에 상응한 함수 실행
  useEffect(() => {
    if (!open || status === "PENDING") {
      return;
    }

    if (status === "PROXY_REGISTER") {
      //PROXY_REGISTER일때 프록시 컨트랙트 생성
      registerProxy()
        .on("receipt", () => updateStatus()) //블록체인에 트랜잭션이 들어가면 상태 다시 체크하여 업데이트
        .catch(() => {
          setStatus("PENDING");
          setOpen(false);
        });
    } else if (status === "APPROVE_ALL") {
      //APPROVE_ALL일때 토큰 사용 승인하기
      setApprovalForAll(contract)
        .then((receipt: any) => {
          updateStatus();
        }) //블록체인에 트랜잭션이 들어가면 상태 다시 체크하여 업데이트
        .catch(() => {
          setStatus("PENDING");
          setOpen(false);
        });
    }
  }, [status]);

  //모달창이 열리면 로그인된 유저 상태를 체크하고 업데이트 하기
  useEffect(() => {
    if (open) {
      updateStatus();
    } else {
      setStatus("PENDING");
    }
  }, [open]);

  //판매 주문 제출
  const generateSellOrder = () => {
    // 가격이 0보다 작으면 주문 제출 불가
    if (+price < 0) {
      return;
    }

    //가격을 wei단위의 빅넘버로 변경후 16진수로 만들기
    const hexPrice = new BN(
      Web3.utils.toWei(price.toString(), "ether")
    ).toString(16);

    //판매 주문 생성
    sellOrder(
      contract,
      tokenId,
      `0x${hexPrice}`,
      expirationTime?.unix() || 0
    ).then(() => setOpen(false));
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-sell-modal"
      aria-describedby="modal-sell-modal"
    >
      <SellModalBox>
        <StatusBox>
          {/* PENDING 상태시 로딩 보여주기 */}
          {status === "PENDING" && <CircularProgress />}
          {status === "PROXY_REGISTER" && (
            <>
              <CircularProgress />
              <StatusText>Register Proxy</StatusText>
            </>
          )}

          {status === "APPROVE_ALL" && (
            <>
              <CircularProgress />
              <StatusText>Approve Your NFTs to your Proxy Contract</StatusText>
            </>
          )}
          {status === "GENERATE_ORDER" && (
            <>
              <SellBox>
                <ModalTitle>Sell Order</ModalTitle>
                {/* eth 가격 불러오기*/}
                <TextField
                  required
                  id="price"
                  label="Price (ETH)"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(+event.target.value)}
                  fullWidth
                />

                {/* 유효기간  */}
                <DateTimePickerBox>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      label="DateTimePicker"
                      value={expirationTime}
                      onChange={(newValue) => {
                        setExpirationTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </DateTimePickerBox>

                <Button
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={generateSellOrder}
                >
                  Generate Sell Order
                </Button>
              </SellBox>
            </>
          )}
        </StatusBox>
      </SellModalBox>
    </Modal>
  );
};

const SellModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #f0f0f0;
  padding: 48px 24px;
  border-radius: 8px;
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.div`
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
`;

const SellBox = styled.div`
  width: 100%;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const DateTimePickerBox = styled.div`
  margin-top: 24px;
`;
