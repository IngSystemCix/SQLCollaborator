import dagre from "dagre";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "react-flow-renderer";
import "./Er.module.css";
import { ERModel } from "./Er.types";
const nodeWidth = 240; // Ancho de los nodos
const nodeHeight = 200; // Alto de los nodos
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    // Dejamos que ReactFlow calcule el tamaño real
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x, y },
      // Optionally, you can lock the position to prevent dragging:
      // draggable: false,
    };
  });

  return { nodes: layoutedNodes, edges };
};

const AutoFitView = () => {
  const { fitView } = useReactFlow();
  useEffect(() => {
    fitView();
  }, [fitView]);
  return null;
};

export const Er = () => {
  const er: ERModel = {
    entities: [
      {
        name: "User",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          { name: "name", type: "varchar" },
          { name: "email", type: "varchar" },
          {
            name: "role_id",
            type: "int",
            isForeignKey: true,
            references: "Role",
            cardinality: "N:1",
          },
        ],
      },
      {
        name: "Role",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          { name: "name", type: "varchar" },
        ],
      },
      {
        name: "Product",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          { name: "name", type: "varchar" },
          { name: "price", type: "decimal" },
          { name: "stock", type: "int" },
          {
            name: "category_id",
            type: "int",
            isForeignKey: true,
            references: "Category",
            cardinality: "N:1",
          },
        ],
      },
      {
        name: "Category",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          { name: "name", type: "varchar" },
        ],
      },
      {
        name: "Order",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          {
            name: "user_id",
            type: "int",
            isForeignKey: true,
            references: "User",
            cardinality: "N:1",
          },
          { name: "order_date", type: "datetime" },
          { name: "total", type: "decimal" },
        ],
      },
      {
        name: "OrderItem",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          {
            name: "order_id",
            type: "int",
            isForeignKey: true,
            references: "Order",
            cardinality: "N:1",
          },
          {
            name: "product_id",
            type: "int",
            isForeignKey: true,
            references: "Product",
            cardinality: "N:1",
          },
          { name: "quantity", type: "int" },
          { name: "price", type: "decimal" },
        ],
      },
      {
        name: "Payment",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          {
            name: "order_id",
            type: "int",
            isForeignKey: true,
            references: "Order",
            cardinality: "1:1",
          },
          { name: "payment_method", type: "varchar" },
          { name: "status", type: "varchar" },
        ],
      },
      {
        name: "Address",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          {
            name: "user_id",
            type: "int",
            isForeignKey: true,
            references: "User",
            cardinality: "N:1",
          },
          { name: "line1", type: "varchar" },
          { name: "city", type: "varchar" },
          { name: "country", type: "varchar" },
        ],
      },
      {
        name: "Review",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          {
            name: "user_id",
            type: "int",
            isForeignKey: true,
            references: "User",
            cardinality: "N:1",
          },
          {
            name: "product_id",
            type: "int",
            isForeignKey: true,
            references: "Product",
            cardinality: "N:1",
          },
          { name: "rating", type: "int" },
          { name: "comment", type: "text" },
        ],
      },
      {
        name: "ProductTag",
        attributes: [
          {
            name: "product_id",
            type: "int",
            isForeignKey: true,
            references: "Product",
            cardinality: "N:M",
          },
          {
            name: "tag_id",
            type: "int",
            isForeignKey: true,
            references: "Tag",
            cardinality: "N:M",
          },
        ],
      },
      {
        name: "Tag",
        attributes: [
          { name: "id", type: "int", isPrimaryKey: true },
          { name: "label", type: "varchar" },
        ],
      },
    ],
  };

  const rawNodes: Node[] = er.entities.map((entity) => ({
    id: entity.name,
    data: {
      label: (
        <div className="rounded-xl shadow bg-white text-xs overflow-visible">
          <div className="bg-blue-900 text-blue-100 font-semibold px-2 py-1 text-center">
            {entity.name}
          </div>
          <table className="table-auto border-collapse w-auto">
            <tbody>
              {entity.attributes.map((attr) => (
                <tr key={attr.name} className="hover:bg-gray-50">
                  <td className="px-2 py-1 text-left text-gray-800 font-mono break-words align-top">
                    {attr.name}
                  </td>
                  <td className="px-2 py-1 text-right text-gray-500 break-words align-top">
                    {attr.type}
                  </td>
                  <td className="px-2 py-1 text-right break-words align-top">
                    {attr.isPrimaryKey && (
                      <span className="text-blue-600 font-bold">[PK]</span>
                    )}
                    {attr.isForeignKey && (
                      <span className="text-green-600 font-bold ml-1">
                        [FK → {attr.references}]
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    position: { x: 0, y: 0 },
    style: {
      width: "auto",
      backgroundColor: "#fff",
      padding: 0,
      border: "none",
    },
  }));

  const rawEdges: Edge[] = er.entities.flatMap((entity) =>
    entity.attributes
      .filter((attr) => attr.isForeignKey && attr.references)
      .map((attr) => {
        const color =
          attr.cardinality === "1:1"
            ? "#7e22ce"
            : attr.cardinality === "N:M"
            ? "#dc2626"
            : "#0d9488";

        return {
          id: `${entity.name}-${attr.name}-to-${attr.references}`,
          source: entity.name,
          target: attr.references!,
          label: `${attr.name}${
            attr.cardinality ? ` (${attr.cardinality})` : ""
          }`,
          animated: true,
          type: "smoothstep",
          style: { stroke: color, strokeWidth: 2 },
          labelStyle: { fontSize: 10, fill: color, fontWeight: "bold" },
        };
      })
  );

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    rawNodes,
    rawEdges
  );

  const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (reactFlowWrapper.current) {
      const canvas = await html2canvas(reactFlowWrapper.current);
      const link = document.createElement("a");
      link.download = "er-diagram.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleExportPDF = async () => {
    if (reactFlowWrapper.current) {
      const canvas = await html2canvas(reactFlowWrapper.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("er-diagram.pdf");
    }
  };

  return (
    <ReactFlowProvider>
      <div
        className="er-container relative border"
        style={{ width: "100%", height: "410px" }}
        ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView>
          <AutoFitView />
          <Background gap={16} />
          <Controls />
          <div
            style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}
            className="flex gap-2 p-2">
            <button
              onClick={handleExportImage}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Exportar PNG
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              Exportar PDF
            </button>
          </div>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};
