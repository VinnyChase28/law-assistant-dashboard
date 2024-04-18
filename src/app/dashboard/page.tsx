import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  type: string;
  status: string;
  date: string;
  amount: string;
}

interface RecentSale {
  id: string;
  name: string;
  email: string;
  avatarSrc: string;
  avatarFallback: string;
  amount: string;
}

const transactions: Transaction[] = [
  {
    id: "t1",
    customerName: "Liam Johnson",
    customerEmail: "liam@example.com",
    type: "Sale",
    status: "Approved",
    date: "2023-06-23",
    amount: "$250.00",
  },
  // Add more transactions as needed
];

const recentSales: RecentSale[] = [
  {
    id: "s1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatarSrc: "/avatars/01.png",
    avatarFallback: "OM",
    amount: "+$1,999.00",
  },
  // ... (other recent sales)
];

interface StatCardProps {
  title: string;
  icon: JSX.Element;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, value, change }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

interface TransactionRowProps {
  customerName: string;
  customerEmail: string;
  type: string;
  status: string;
  date: string;
  amount: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  customerName,
  customerEmail,
  type,
  status,
  date,
  amount,
}) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{customerName}</div>
      <div className="hidden text-sm text-muted-foreground md:inline">
        {customerEmail}
      </div>
    </TableCell>
    <TableCell className="hidden xl:table-column">{type}</TableCell>
    <TableCell className="hidden xl:table-column">
      <Badge className="text-xs" variant="outline">
        {status}
      </Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
      {date}
    </TableCell>
    <TableCell className="text-right">{amount}</TableCell>
  </TableRow>
);

interface RecentSaleProps {
  name: string;
  email: string;
  avatarSrc: string;
  avatarFallback: string;
  amount: string;
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* ... (rest of the component) */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* ... (stat cards) */}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      customerName={transaction.customerName}
                      customerEmail={transaction.customerEmail}
                      type={transaction.type}
                      status={transaction.status}
                      date={transaction.date}
                      amount={transaction.amount}
                    />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={sale.avatarSrc} alt="Avatar" />
                    <AvatarFallback>{sale.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}