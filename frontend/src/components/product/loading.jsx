export default function Loading({ colSpan = 6 }) {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="px-4 py-12 text-center text-gray-400 text-sm italic">
          Loading...
        </td>
      </tr>
    </tbody>
  );
}
