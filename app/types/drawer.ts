export type Anchor = 'top' | 'left' | 'bottom' | 'right'

export type DrawerOpenState = {
    [key in Anchor]: boolean
}
