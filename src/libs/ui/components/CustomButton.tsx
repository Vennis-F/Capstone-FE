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
      // backgroundColor: "rgb(0, 167, 111)",
      backgroundColor: MainColor.RED_500,
      fontWeight: '600',
      width: '100%',
      '&:hover': {
        // backgroundColor: ' rgb(216,245,232)',
        backgroundColor: MainColor.RED_400,
      },
      ...sxCustom,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default CustomButton
