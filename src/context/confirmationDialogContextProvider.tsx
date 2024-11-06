import { ReactNode, createContext, useContext, useState } from "react";
import { Dialog } from "@components";

interface ConfirmationDialogContextProps {
  openDialog: (config: DialogConfig) => void;
}

interface DialogConfig {
  title: string;
  message?: string;
  okLabel?: string;
  dismissLabel?: string;
  actionCallback: (confirmed: boolean) => void;
}

const ConfirmationDialogContext = createContext<
  ConfirmationDialogContextProps | undefined
>(undefined);

interface ConfirmationDialogProviderProps {
  children: ReactNode;
}

const ConfirmationDialogProvider: React.FC<ConfirmationDialogProviderProps> = ({
  children,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null);

  const openDialog = (config: DialogConfig) => {
    setDialogOpen(true);
    setDialogConfig(config);
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig(null);
  };

  const onConfirm = () => {
    if (dialogConfig) {
      dialogConfig.actionCallback(true);
      resetDialog();
    }
  };

  const onDismiss = () => {
    if (dialogConfig) {
      dialogConfig.actionCallback(false);
      resetDialog();
    }
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <Dialog
        isOpen={dialogOpen}
        title={dialogConfig?.title || ""}
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        okLabel={dialogConfig?.okLabel}
        dismissLabel={dialogConfig?.dismissLabel}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmationDialog must be used within a ConfirmationDialogProvider"
    );
  }

  const { openDialog } = context;

  const getConfirmation = (options: Omit<DialogConfig, "actionCallback">) =>
    new Promise<boolean>((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};

export { ConfirmationDialogProvider, useConfirmationDialog };
