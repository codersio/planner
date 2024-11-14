import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
// import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

const notyf = new Notyf();

const Create = ({ client_idf2, customer_dets, }) => {
    const today1 = new Date().toISOString().split('T')[0];
    const { data, setData, post, processing, errors } = useForm({
        quotation_no: client_idf2.value,
        quotation_date: today1,
        customer_name: '',
        customer_details: '',
        source_id: '',
        mobile_no: '',
        email: '',
        status: '',
        Billing_address: '',
        message: '',
        product_details: [{ product_id: '', p_qty: '', price: '', amount: '' }],
        tax_details: [{ tax_id: '', tax_value: '', tax_name: '' }],
    });

    const [products, setProducts] = React.useState([]);
    const [taxOptions, setTaxOptions] = React.useState([]);

    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean'],
    ];

    const modules = {
        toolbar: toolbarOptions,
    };

    const handleMessageChange = (content) => {
        setData('message', content);
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/getproduct');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };

        const fetchTaxOptions = async () => {
            try {
                const response = await axios.get('/gettaxoptions');
                setTaxOptions(response.data);
            } catch (error) {
                console.error("Failed to fetch tax options", error);
            }
        };

        fetchProducts();
        // fetchTaxOptions();
    }, []);

    const addProductDetail = () => {
        setData('product_details', [...data.product_details, { product_id: '', p_qty: '', price: '', amount: '' }]);
    };

    const addTaxDetail = () => {
        setData('tax_details', [...data.tax_details, { tax_id: '', tax_value: '' }]);
    };

    const handleProductChange = (index, product_id) => {
        const selectedProduct = products.find(product => product.product_id === parseInt(product_id));
        const newProductDetails = [...data.product_details];
        newProductDetails[index] = {
            ...newProductDetails[index],
            product_id,
            price: selectedProduct ? selectedProduct.price : 0,
            amount: selectedProduct ? selectedProduct.price * newProductDetails[index].p_qty : 0,
        };
        setData('product_details', newProductDetails);
    };

    const handleQuantityChange = (index, quantity) => {
        const newProductDetails = [...data.product_details];
        newProductDetails[index].p_qty = quantity;
        newProductDetails[index].amount = newProductDetails[index].price * quantity;
        setData('product_details', newProductDetails);
    };

    const handleTaxChange = (index, tax_id) => {
        const selectedTax = taxOptions.find(tax => tax.id === parseInt(tax_id));
        const newTaxDetails = [...data.tax_details];
        newTaxDetails[index] = {
            ...newTaxDetails[index],
            tax_id,
            tax_name: selectedTax.name,
            tax_value: selectedTax ? selectedTax.percent : 0, // Updated to use `tax`
        };
        setData('tax_details', newTaxDetails);
    };
    const today = new Date().toISOString().split('T')[0];

    const removeProductDetail = (index) => {
        const newProductDetails = data.product_details.filter((_, i) => i !== index);
        setData('product_details', newProductDetails);
    };

    const removeTaxDetail = (index) => {
        const newTaxDetails = data.tax_details.filter((_, i) => i !== index);
        setData('tax_details', newTaxDetails);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/Quotation', {
            onSuccess: () => notyf.success('Quotation added successfully!'),
            onError: () => notyf.error('Failed to add Quotation. Please check your inputs.'),
        });
    };

    useEffect(() => {
        if (data.customer_details) {
            axios.get(`/Get-Customer/${data.customer_details}`)
                .then((response) => {
                    const customerData = response.data;
                    const billingAddress = typeof customerData.address === 'string' && customerData.address.trim() !== ''
                        ? (() => {
                            try {
                                const parsedAddresses = JSON.parse(customerData.address);
                                return Array.isArray(parsedAddresses)
                                    ? parsedAddresses.map(addr => addr.address).join(', ')
                                    : 'Invalid Address Format';
                            } catch {
                                return 'Invalid Address Format';
                            }
                        })()
                        : Array.isArray(customerData.address)
                            ? customerData.address.map(addr => addr.address).join(', ')
                            : 'No Address';

                    setData({
                        ...data,
                        customer_name: `${customerData.first_name} ${customerData.last_name}`,
                        Billing_address: customerData.address,
                        mobile_no: customerData.phone,
                        email: customerData.email,
                    });
                })
                .catch((error) => console.error("Failed to fetch service partner details", error));
        }
    }, [data.customer_details]);
    return (
        <div>
                         <Header/>
  <Nav/>
            <div className="w-[83.2%] ml-[11.5rem] absolute right-0 overflow-hidden px-3">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Add Quotation</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Quotation No</label>
                        <input
                            type="text"
                            name="quotation_no"
                            readOnly={true}
                            value={data.quotation_no}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Client Id"
                        />
                        {errors.quotation_no && <p className="mt-1 text-xs text-red-500">{errors.quotation_no}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Quotation Date</label>
                        <input
                            type="date"
                            name="quotation_date"
                            value={data.quotation_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Client Id"
                        />
                        {errors.quotation_date && <p className="mt-1 text-xs text-red-500">{errors.quotation_date}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Customer </label>
                        <select
                            name="customer_details"
                            value={data.customer_details}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">---Select----</option>
                            {customer_dets.map((customer_det) => (
                                <option key={customer_det.user_id} value={customer_det.user_id}>
                                    {customer_det.name}
                                </option>
                            ))}
                        </select>
                        {errors.customer_details && <p className="mt-1 text-xs text-red-500">{errors.customer_details}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Mobile No</label>
                        <input
                            type="text"
                            name="mobile_no"
                            value={data.mobile_no}
                            readOnly={true}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Mobile No"
                        />
                        {errors.mobile_no && <p className="mt-1 text-xs text-red-500">{errors.mobile_no}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            readOnly={true}
                            value={data.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Mobile No"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                        <select
                            name='status'
                            value={data.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Status</option>
                            <option value="1">Open</option>
                            <option value="0">Close</option>
                            <option value="2">Pending</option>
                        </select>
                        {errors.Billing_address && <p className="mt-1 text-xs text-red-500">{errors.Billing_address}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Billing Address</label>
                        <textarea
                            type="text"
                            name="Billing_address"
                            readOnly={true}
                            value={data.Billing_address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Mobile No"
                        />
                        {errors.Billing_address && <p className="mt-1 text-xs text-red-500">{errors.Billing_address}</p>}
                    </div>

                     <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Source by</label>
                        <select
                            name='source_id'
                            value={data.source_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg"
                        >
                            <option value="">Select </option>
                            <option value="01">Phone</option>
                            <option value="1">Mail</option>
                            <option value="2">Website</option>
                        </select>
                        {errors.Billing_address && <p className="mt-1 text-xs text-red-500">{errors.Billing_address}</p>}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
                        <ReactQuill
                            value={data.message}
                            onChange={handleMessageChange}
                            modules={modules}
                            theme="snow"
                            placeholder="Enter message here..."
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>





                    <h2 className="mb-1 text-2xl font-bold text-gray-600 md:col-span-2">Product Details</h2>

                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="button"
                            onClick={addProductDetail}
                            className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                        >
                            {processing ? 'Processing...' : 'Add New Product'}
                        </button>
                    </div>

                    <div className="w-full col-span-1 overflow-x-auto md:col-span-2">
                        <table className="w-full border border-collapse border-gray-300 table-auto" id="tab_product_detail">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300">Product</th>
                                    <th className="px-4 py-2 border border-gray-300">Quantity</th>
                                    <th className="px-4 py-2 border border-gray-300">Price</th>
                                    <th className="px-4 py-2 border border-gray-300">Amount</th>
                                    <th className="px-4 py-2 border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.product_details.map((productDetail, index) => (
                                    <tr key={index} id={`row_id_${index}`}>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <select
                                                name={`product_id[${index}]`}
                                                value={productDetail.product_id}
                                                onChange={(e) => handleProductChange(index, e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg"
                                            >
                                                <option value="">Select Product</option>
                                                {products.map(product => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <input
                                                type="number"
                                                name={`p_qty[${index}]`}
                                                value={productDetail.p_qty}
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg"
                                                placeholder="Enter Quantity"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <input
                                                type="text"
                                                value={productDetail.price}
                                                readOnly
                                                className="w-full border border-gray-300 rounded-lg"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <input
                                                type="text"
                                                value={productDetail.amount}
                                                readOnly
                                                className="w-full border border-gray-300 rounded-lg"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <span className="text-red-600 cursor-pointer" onClick={() => removeProductDetail(index)}>
                                                <i className="fa fa-trash"></i> Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h2 className="mb-1 text-2xl font-bold text-gray-600 md:col-span-2">Tax Details</h2>

                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="button"
                            onClick={addTaxDetail}
                            className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                        >
                            Add New Tax
                        </button>
                    </div>

                    <div className="w-full col-span-1 overflow-x-auto md:col-span-2">
                        <table className="w-full border border-collapse border-gray-300 table-auto" id="tab_tax_detail">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300">Tax</th>
                                    <th className="px-4 py-2 border border-gray-300">Value (%)</th>
                                    <th className="px-4 py-2 border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.tax_details.map((taxDetail, index) => (
                                    <tr key={index} id={`tax_row_id_${index}`}>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <select
                                                name={`tax_id[${index}]`}
                                                value={taxDetail.tax_id}
                                                onChange={(e) => handleTaxChange(index, e.target.value, taxDetail.tax_value)}
                                                className="w-full border border-gray-300 rounded-lg"
                                            >
                                                <option value="">Select Tax</option>
                                                {taxOptions.map((tax) => (
                                                    <option key={tax.id} value={tax.id}>
                                                        {tax.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <input
                                                type="number"
                                                name={`tax_value[${index}]`}
                                                value={taxDetail.tax_value}
                                                onChange={(e) => handleTaxChange(index, taxDetail.tax_id, e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg"
                                                placeholder="Enter Tax Value"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <span className="text-red-600 cursor-pointer" onClick={() => removeTaxDetail(index)}>
                                                <i className="fa fa-trash"></i> Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                        >
                            {processing ? 'Processing...' : 'Create Quotation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
