import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Fade,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import { REACT_APP_API_URL } from '../../../config';
import { OrderStatus } from '../../../enums/order.enum';
import { Order } from '../../../types/order/order';
import { formatterStr } from '../../../utils';

interface Data {
  id: string;
  title: string;
  price: string;
  agent: string;
  client: string;
  type: string;
  status: string;
}

type SortOrder = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'id', numeric: true, disablePadding: false, label: 'MB ID' },
  { id: 'title', numeric: true, disablePadding: false, label: 'TITLE' },
  { id: 'price', numeric: false, disablePadding: false, label: 'PRICE' },
  { id: 'agent', numeric: false, disablePadding: false, label: 'AGENT' },
  { id: 'client', numeric: false, disablePadding: false, label: 'USER' },
  { id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface OrderPanelListProps {
  orders: Order[];
  anchorEl: (HTMLElement | null)[];
  menuIconClickHandler: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  menuIconCloseHandler: () => void;
  updateOrderHandler: (order: { _id: string; orderStatus: OrderStatus }) => void;
  removeOrderHandler: (id: string) => void;
}

export const OrderPanelList: React.FC<OrderPanelListProps> = ({
  orders,
  anchorEl,
  menuIconClickHandler,
  menuIconCloseHandler,
  updateOrderHandler,
  removeOrderHandler,
}) => {
  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead />
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <span className="no-data">Data not found!</span>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order, index) => {
                const modelImage = `${REACT_APP_API_URL}/${order?.modelData?.modelImages?.[0]}`;

                return (
                  <TableRow
                    hover
                    key={order?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{order._id}</TableCell>
                    <TableCell align="left" className="name">
                      <Stack direction="row" alignItems="center">
                        <Link href={`/order/detail?id=${order?._id}`} passHref>
                          <Avatar
                            alt={order?.modelData?.modelTitle || 'Model'}
                            src={modelImage}
                            sx={{ ml: 1, mr: 2 }}
                          />
                        </Link>
                        <Link href={`/order/detail?id=${order?._id}`} passHref>
                          <Typography variant="body2">
                            {order?.modelData?.modelTitle}
                          </Typography>
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{formatterStr(order?.orderPrice)}</TableCell>
                    <TableCell align="center">{order?.agentData?.memberNick}</TableCell>
                    <TableCell align="center">{order?.buyerData?.memberNick}</TableCell>
                    <TableCell align="center">
                      {order.orderStatus === OrderStatus.CANCELLED && (
                        <Button
                          variant="outlined"
                          sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
                          onClick={() => removeOrderHandler(order._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      )}

                      {order.orderStatus === OrderStatus.COMPLETED && (
                        <Button className="badge warning">{order.orderStatus}</Button>
                      )}

                      {[OrderStatus.PAID, OrderStatus.PENDING, OrderStatus.PROCESSING].includes(
                        order.orderStatus,
                      ) && (
                        <>
                          <Button
                            onClick={(e) => menuIconClickHandler(e, index)}
                            className="badge success"
                          >
                            {order.orderStatus}
                          </Button>

                          <Menu
                            className="menu-modal"
                            anchorEl={anchorEl[index]}
                            open={Boolean(anchorEl[index])}
                            onClose={menuIconCloseHandler}
                            TransitionComponent={Fade}
                            sx={{ p: 1 }}
                          >
                            {Object.values(OrderStatus)
                              .filter((status) => status !== order.orderStatus)
                              .map((status) => (
                                <MenuItem
                                  onClick={() =>
                                    updateOrderHandler({ _id: order._id, orderStatus: status })
                                  }
                                  key={status}
                                >
                                  <Typography variant="subtitle1">{status}</Typography>
                                </MenuItem>
                              ))}
                          </Menu>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
