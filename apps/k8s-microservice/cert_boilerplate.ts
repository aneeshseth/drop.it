/*
const clusterIssuer = {
    apiVersion: "cert-manager.io/v1",
    kind: "ClusterIssuer",
    metadata: {
      name: codebase_name,
      namespace: "cert-manager",
    },
    spec: {
      acme: {
        server: "https://acme-v02.api.letsencrypt.org/directory",
        email: "aneeshseth2018@gmail.com",
        privateKeySecretRef: {
          name: codebase_name,
        },
        solvers: [
          {
            http01: {
              ingress: {
                class: "nginx",
              },
            },
          },
        ],
      },
    },
  };

  await customObjectsApi.createClusterCustomObject(
    "cert-manager.io",
    "v1",
    "clusterissuers",
    clusterIssuer
  );

  const certificate = {
    apiVersion: "cert-manager.io/v1",
    kind: "Certificate",
    metadata: {
      name: codebase_name + "euwbcnedljxn",
      namespace: "ingress-nginx",
    },
    spec: {
      secretName: "certone-key",
      issuerRef: {
        name: codebase_name,
        kind: "ClusterIssuer",
      },
      commonName: `${codebase_name}.wsserver.aneesh.wiki`,
      dnsNames: [`${codebase_name}.wsserver.aneesh.wiki`],
    },
  };

  await customObjectsApi.createNamespacedCustomObject(
    "cert-manager.io",
    "v1",
    "ingress-nginx",
    "certificates",
    certificate
  );
*/
