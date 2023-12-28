import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useCallback, useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import Web3 from "web3";
import BN from "bn.js";

interface OfferAcceptModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  contract: string;
  tokenId: string;
  offer: any;
}

export const OfferAcceptModal = ({
  open,
  setOpen,
  contract,
  tokenId,
  offer,
}: OfferAcceptModalProps) => {
  const [status, setStatus] = useState("PENDING");
  const {
    checkLogin,
    hasProxy,
    registerProxy,
    isApprovedForAll,
    setApprovalForAll,
    sellOrder,
    acceptOfferOrder,
  } = useOrder();

  const updateStatus = useCallback(async () => {
    if (!open || !(await checkLogin())) {
      setStatus("PENDING");
      return;
    }

    if (!(await hasProxy())) {
      setStatus("PROXY_REGISTER");
      return;
    } else if (!(await isApprovedForAll(contract))) {
      setStatus("APPROVE_ALL");
      return;
    } else {
      setStatus("GENERATE_ORDER");
    }
  }, [checkLogin, hasProxy, isApprovedForAll, contract, open]);

  useEffect(() => {
    if (!open || status === "PENDING") {
      return;
    }

    if (status === "PROXY_REGISTER") {
      registerProxy()
        .on("receipt", () => updateStatus())
        .catch(() => {
          setStatus("PENDING");
          setOpen(false);
        });
    } else if (status === "APPROVE_ALL") {
      setApprovalForAll(contract)
        .then((receipt: any) => {
          updateStatus();
        })
        .catch(() => {
          setStatus("PENDING");
          setOpen(false);
        });
    } else if (status == "GENERATE_ORDER") {
      // Offer 를 수락해서 트랜잭션을 제출
      acceptOfferOrder(offer).then(() => setOpen(false));
    }
  }, [status]);

  useEffect(() => {
    if (open) {
      updateStatus();
    } else {
      setStatus("PENDING");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-sell-modal"
      aria-describedby="modal-sell-modal"
    >
      <SellModalBox>
        <StatusBox>
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
              <CircularProgress />
              <StatusText>Send Transaction...</StatusText>
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
