export enum CellType {
    dead,
    live
}

export const Config = {
    cellSize: 30,
    cellsCount: 80, // unused ?
    gridCell: {
        empty: CellType.dead,
        live: CellType.live,
    }
};
