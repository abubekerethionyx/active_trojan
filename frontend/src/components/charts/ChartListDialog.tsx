import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ChartPaper } from './ChartPaper';
import PTChart from './PTChart';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const ChartListDialog = ({ chartData, expanded, setExpanded, selectIndex }) => {
  const dialogRef = React.useRef(null);

  const handleClose = () => {
    setExpanded(!expanded);
  };



  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={expanded}
        fullWidth
        maxWidth="md"
        ref={dialogRef}
      >
        <DialogTitle sx={{ m: 0, p: 0.5 }} id="customized-dialog-title">
          simulation chart
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <ChartPaper
            key={selectIndex}
            chartName={`Chart-${selectIndex}`}
            chartComponent={<PTChart />}
            onExpand={handleClose}
            id={`chart-${selectIndex}`}
            tabIndex={0}
            expanded={expanded}
          />

        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
