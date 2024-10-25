import { ConnectionStatus } from "@/services/useConnections";
import { Check, Loader2, UserPlus, X } from "lucide-react";

const StatusIcon = ({ status }: { status: ConnectionStatus }) => {
  switch (status) {
    case ConnectionStatus.PENDING:
      return <Loader2 className="w-4 h-4 mr-2" />;
    case ConnectionStatus.APPROVED:
      return <Check className="w-4 h-4 mr-2" />;
    case ConnectionStatus.REJECTED:
      return <X className="w-4 h-4 mr-2" />;
    default:
      return <UserPlus className="w-4 h-4 mr-2" />;
  }
};

export default StatusIcon;
