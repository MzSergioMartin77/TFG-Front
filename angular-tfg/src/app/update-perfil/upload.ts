import { HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { distinctUntilChanged, scan } from 'rxjs/operators';
  
  function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response;
  }
  
  function isHttpProgressEvent(
    event: HttpEvent<unknown>
  ): event is HttpProgressEvent {
    return (
      event.type === HttpEventType.DownloadProgress ||
      event.type === HttpEventType.UploadProgress
    );
  }
  
  export interface Upload {
    progress: number;
    state: 'NADA' | 'CARGANDO' | 'SUBIDO';
  }
  
  export function upload(): (
    source: Observable<HttpEvent<unknown>>
  ) => Observable<Upload> {
    const initialState: Upload = { state: 'NADA', progress: 0 };
    const reduceState = (upload: Upload, event: HttpEvent<unknown>): Upload => {
      if (isHttpProgressEvent(event)) {
        return {
          progress: event.total
            ? Math.round((100 * event.loaded) / event.total)
            : upload.progress,
          state: 'CARGANDO',
        };
      }
      if (isHttpResponse(event)) {
        return {
          progress: 100,
          state: 'SUBIDO',
        };
      }
      return upload;
    };
    return (source) =>
      source.pipe(
        scan(reduceState, initialState),
        distinctUntilChanged(
          (a, b) => a.state === b.state && a.progress === b.progress
        )
      );
  }