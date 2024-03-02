/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

let currentLikes = 0;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function APICall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      currentLikes++;
      resolve({
        totalLikes: currentLikes,
      });
    }, 1000);
  });
}

export default function OptimisticReactQuery() {
  console.log("renderReactQuery");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["likes"],
    queryFn: () => currentLikes,
  });

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      const response = await APICall();
      return response;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["likes"]);

      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      const previousLikes = queryClient.getQueryData(["likes"]);

      queryClient.setQueryData(["likes"], previousLikes + 1);

      return previousLikes;
    },
    onError: (error, variables, context) => {
      console.log(context);
      // An error happened!
      queryClient.setQueryData(["likes"], () => context?.previousLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  return (
    <section className="mt-4">
      <p className="mb-2 text-xl">Likes:{data}</p>
      <button onClick={() => mutate()} disabled={status === "pending"}>
        <LikeSvg
          className={`${status === "pending" ? "scale-110 drop-shadow-md" : ""} transition-all duration-300 ease-out`}
        />
      </button>
      {status === "error" ? <p>An error occurred!</p> : null}
    </section>
  );
}

function LikeSvg({ className }) {
  console.log("renderSVG");
  return (
    <div className={`${className}`}>
      <svg
        width="128"
        height="128"
        style={{ enableBackground: "new 0 0 128 128" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <path
            d="M79.46,54.2c6.15-1.74,17.05-1.51,20.24-1.28c5.58,0.4,11.16,0.28,12.12,7.05 c0.64,4.56-0.89,8.71-7.65,9.45c-2.38,0.26-5.29,0.4-7.69,0.78l-1.88,2.07c2.22-0.3,7.31-0.2,8.84-0.39 c6.46-0.79,11.92,1.8,12.74,8.01c0.72,5.44-3.38,9.64-9.2,9.32c-1.99-0.11-7.61,0.66-13.19,0.81l-0.43,1.13l-0.2,0.34 c3.54,0.1,6.93,0.24,9.34,0.36c6.45,0.32,9.97,3.78,9.88,8.38c-0.11,5.59-5.34,7.69-9.08,8c-2.8,0.23-12.82-0.06-19.55-0.61 l-1.06,1.81c0.48,0.01,13.37,0.63,13.86,0.66c5.91,0.44,8.43,2.58,8.28,6.8c-0.21,5.92-6.53,7.49-9.95,8.03 c-5.55,0.88-12.95,0.62-18.34,0.77c-11.66,0.32-35.52,0.84-46.66-8.92c-3.8-3.33-7.63-7.86-10.89-9.16 c-6.83-2.72-7.42-11.62-7.11-22.87c0.15-5.44-1.72-20.71,4.88-24.41c9.26-5.19,24.96-9.11,30.18-13.21 c8.56-6.73,13.56-17.68,15.84-24.09C67.12,10.82,68.44,2,76.03,2c13.3,0,12.95,11.88,13.2,17.82 C89.72,31.45,75.37,52.97,79.46,54.2z"
            style={{ fill: "#FAC036" }}
          />
          <path
            d="M68.02,80.94c0.13,5.99,4.75,8.56,4.96,8.67c-2.65-0.06-8.39,2.63-8.39,8.34 c0,4.71,2.56,8.38,5.13,9.63c-1.69,0.36-4.88,2.66-4.88,7.68c0,7.36,5.46,10.05,9.59,10.56c4.13,0.51,15.61-0.18,19.4-0.76 c2.03-0.31-10.06-0.45-18.91-1.61c-2.54-0.33-5.57-2.72-6.06-5.94c0,0-0.72-4.25,3.16-6.7c0,0,1.64-1.41,9.25-1.35l2.3,0.03 c0.72,0.05,9.91,0.37,12.97,0.59c1.35,0.1,2.51,0.29,3.51,0.57c-0.16-0.23-0.34-0.61-0.28-1.16c0.13-1.16,0.89-1.21,1.09-1.21 l-1.82-0.1l0,0l-6.48-0.37c-6.46-0.39-15.56-1.01-16.61-1.43c0,0-6.34-1.6-6.34-8.1c0,0-0.33-5.53,8.13-5.79 c0,0,19.99-1.15,28.45-0.03c0,0-1.21-2.25,0.79-3.26c0,0-14.27,0.35-23.21,0.59s-10.85-4.51-11.08-7.1 c-0.03-0.39-0.11-1.01-0.11-1.74c0-5.15,4.52-5.83,10.99-6.67c13.96-1.83,19.87-2.4,19.87-2.4c0.77-0.09,1.5-0.14,2.21-0.13 c-0.39-0.22-0.92-0.63-0.99-1.31c-0.04-0.44,0.18-1.11,0.18-1.11s-6.02,0.49-15.31,1.73c-9.28,1.24-16.7,0.67-17.37-4.76 c-0.49-3.98,0.18-6.51,1.9-8.48c2.12-2.43,5.53-3.64,5.53-3.64s-0.39-0.08-0.61-0.37c-0.22-0.3-0.23-0.77-0.23-0.77 C71.18,54,66,58.81,66.43,64.99c0.3,4.23,1.42,7.05,4.23,8.42C70.67,73.4,67.89,74.96,68.02,80.94z"
            style={{ fill: "#E48C15" }}
          />
          <path
            d="M71.11,67.52l-3.32,0.96c0,0,4.92,18.11-13.24,30.59c0,0-2.33,1.56-1.2,2.73 c0,0,0.79,1.36,4.13-1.19C57.48,100.6,75.2,89.04,71.11,67.52z"
            style={{ fill: "#E48C15" }}
          />
        </g>
      </svg>
    </div>
  );
}
