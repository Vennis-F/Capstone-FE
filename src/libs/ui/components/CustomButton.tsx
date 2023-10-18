import { Button, SxProps } from '@mui/material'

type Props = {
  onClick: () => void
  children: React.ReactNode
  sxCustom?: SxProps
}

const CustomButton = ({ onClick, children, sxCustom }: Props) => (
  <Button
    variant="contained"
    disableElevation
    sx={{
      backgroundColor: '#19A7CE',
      fontWeight: '600',
      width: '100%',
      '&:hover': {
        backgroundColor: '#146C94',
      },
      ...sxCustom,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default CustomButton
