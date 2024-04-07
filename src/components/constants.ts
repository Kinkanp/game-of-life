export enum CellType {
    dead,
    live
}

export const Config = {
    cellSize: 15,
    cellsCount: 80,
    gridCell: {
        empty: CellType.dead,
        live: CellType.live,
    }
};
