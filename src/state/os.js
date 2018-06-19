import { Record, List, Map } from 'immutable';
import { entities } from 'potato-engine';
import path from 'path';

const kyes = 3;

export const Window = Record({
  file: null,
  appName: null,
});

export const File = Record({
  type: 'file', // file | app
  name: null,
});

export const State = Record({
  fileExtensionAssociations: Map(),
  desktopFiles: List(),
  selectedFile: null,
  windows: List(),
});

export default function game(state = new State(), action) {
  switch (action.type) {
    case 'SELECT_FILE':
      state = state.set('selectedFile', action.file);
      break;
    case 'OPEN_FILE':
      state = state.withMutations(state => {
        state.selectedFile = null;
        const { file } = action;
        let appName;
        if (file.type === 'app') {
          appName = file.name;
        } else if (file.type === 'file') {
          const ext = path.extname(file.name);
          appName = state.fileExtensionAssociations.get(ext);
        }

        state.windows = state.windows.withMutations(windows => {
          const openIdx = windows.findIndex(wndw => wndw.appName === appName);

          if (openIdx >= 0) {
            const openWindow = windows.get(openIdx);
            windows.set(openIdx, openWindow.set('file', file));
          } else {
            windows.push(Window({ file, appName }));
          }
        });
      });
      break;
    case 'CLOSE_WINDOW':
      state = state.set('windows', state.windows.filter(w => w !== action.window));
      break;
    case 'FOCUS':
      if (action.target === 'desktop') {
        state = state.set('selectedFile', null);
      } else {
        state = state.set(
          'windows',
          state.windows.withMutations(windows => {
            const idx = windows.findIndex(wndw => wndw.appName === action.target);
            const wndw = windows.get(idx);

            windows.remove(idx);
            windows.push(wndw);
          }),
        );
      }
      break;
  }
  return state;
}
