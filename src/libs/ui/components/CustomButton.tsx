import { Button, SxProps } from '@mui/material'

import { MainColor } from 'libs/const/color'

type Props = {
  onClick: () => void
  children: React.ReactNode
  sxCustom?: SxProps
  size?: string
  disable?: boolean
}

const CustomButton = ({ onClick, children, sxCustom, size, disable }: Props) => (
  <Button
    variant="contained"
    disableElevation
    // eslint-disable-next-line
    size={size as any}
    disabled={disable === undefined ? undefined : disable}
    sx={{
      backgroundColor: MainColor.RED_500,
      fontWeight: '600',
      width: '100%',
      '&:hover': {
        backgroundColor: MainColor.RED_600,
      },
      ...sxCustom,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default CustomButton
