import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Button from "../Buttons";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  height: fit-content;
  margin: auto;
  h2 {
    text-align: center;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    width: 30%;
    display: flex;
    justify-content: center;
  }
`;

interface DialogProps {
  title: string;
  message?: string;
  okLabel?: string;
  dismissLabel?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  isOpen,
  onDismiss,
  onConfirm,
  okLabel,
  dismissLabel,
}) => {
  return (
    <div>
      {isOpen &&
        createPortal(
          <Overlay>
            <DialogContainer>
              <h2>{title}</h2>
              {message && <p>{message}</p>}
              <Actions>
                <Button onClick={onDismiss} bgcolor="#e80537">
                  {dismissLabel ?? "Cancelar"}
                </Button>
                <Button onClick={onConfirm}>{okLabel ?? "Ok"}</Button>
              </Actions>
            </DialogContainer>
          </Overlay>,
          document.body
        )}
    </div>
  );
};

export default Dialog;
